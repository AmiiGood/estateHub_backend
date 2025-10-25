import { Cita, Propiedad, Usuario } from "../Models/Asociaciones.js";
import { Op } from "sequelize";

export const crearCita = async (req, res) => {
  const { cita } = req.body;
  try {
    const propiedad = await Propiedad.findByPk(cita.idPropiedad);
    if (!propiedad) {
      return res.status(404).send({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const usuario = await Usuario.findByPk(cita.idUsuario);
    if (!usuario) {
      return res.status(404).send({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const nuevaCita = await Cita.create({
      idPropiedad: cita.idPropiedad,
      idUsuario: cita.idUsuario,
      fecha: new Date(cita.fecha),
      estatus: cita.estatus || "en_proceso",
    });

    return res.status(201).send({
      success: true,
      message: "Cita creada exitosamente",
      data: nuevaCita,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error al crear cita",
      error: e.message,
    });
  }
};

export const actualizarCita = async (req, res) => {
  const { cita } = req.body;
  try {
    const findCita = await Cita.findByPk(cita.idCita);

    if (!findCita) {
      return res.status(404).send({
        success: false,
        message: "Cita no encontrada",
      });
    }

    if (cita.idPropiedad) {
      const propiedad = await Propiedad.findByPk(cita.idPropiedad);
      if (!propiedad) {
        return res.status(404).send({
          success: false,
          message: "Propiedad no encontrada",
        });
      }
    }

    if (cita.idUsuario) {
      const usuario = await Usuario.findByPk(cita.idUsuario);
      if (!usuario) {
        return res.status(404).send({
          success: false,
          message: "Usuario no encontrado",
        });
      }
    }

    await findCita.update({
      idPropiedad: cita.idPropiedad,
      idUsuario: cita.idUsuario,
      fecha: cita.fecha ? new Date(cita.fecha) : findCita.fecha,
      estatus: cita.estatus,
    });

    return res.status(200).send({
      success: true,
      message: "Cita actualizada exitosamente",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al actualizar cita",
      error: e.message,
    });
  }
};

export const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        {
          model: Propiedad,
          as: "propiedad",
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: [
                "idUsuario",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "email",
                "telefono",
              ],
            },
          ],
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: [
            "idUsuario",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "email",
            "telefono",
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: citas,
      count: citas.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener citas",
      error: e.message,
    });
  }
};

export const obtenerCitaPorId = async (req, res) => {
  const { idCita } = req.params;
  try {
    const cita = await Cita.findByPk(idCita, {
      include: [
        {
          model: Propiedad,
          as: "propiedad",
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: [
                "idUsuario",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "email",
                "telefono",
              ],
            },
          ],
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: [
            "idUsuario",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "email",
            "telefono",
          ],
        },
      ],
    });

    if (!cita) {
      return res.status(404).send({
        success: false,
        message: "Cita no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: cita,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener cita",
      error: e.message,
    });
  }
};

export const eliminarCita = async (req, res) => {
  const { idCita } = req.params;
  try {
    const findCita = await Cita.findByPk(idCita);

    if (!findCita) {
      return res.status(404).send({
        success: false,
        message: "Cita no encontrada",
      });
    }

    await findCita.destroy();

    return res.status(200).send({
      success: true,
      message: "Cita eliminada exitosamente",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al eliminar cita",
      error: e.message,
    });
  }
};

export const obtenerCitasPorPropiedad = async (req, res) => {
  const { idPropiedad } = req.params;
  try {
    const citas = await Cita.findAll({
      where: { idPropiedad },
      include: [
        {
          model: Propiedad,
          as: "propiedad",
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: [
            "idUsuario",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "email",
            "telefono",
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: citas,
      count: citas.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener citas por propiedad",
      error: e.message,
    });
  }
};

export const obtenerCitasPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const citas = await Cita.findAll({
      where: { idUsuario },
      include: [
        {
          model: Propiedad,
          as: "propiedad",
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: [
                "idUsuario",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "email",
                "telefono",
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: citas,
      count: citas.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener citas por usuario",
      error: e.message,
    });
  }
};

export const obtenerCitasPorResponsable = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const citas = await Cita.findAll({
      include: [
        {
          model: Propiedad,
          as: "propiedad",
          where: { idUsuario },
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: [
                "idUsuario",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "email",
                "telefono",
              ],
            },
          ],
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: [
            "idUsuario",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "email",
            "telefono",
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: citas,
      count: citas.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener citas por responsable",
      error: e.message,
    });
  }
};

export const obtenerCitasPorEstatus = async (req, res) => {
  const { estatus } = req.params;
  try {
    const citas = await Cita.findAll({
      where: { estatus },
      include: [
        {
          model: Propiedad,
          as: "propiedad",
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: [
                "idUsuario",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "email",
                "telefono",
              ],
            },
          ],
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: [
            "idUsuario",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "email",
            "telefono",
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: citas,
      count: citas.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener citas por estatus",
      error: e.message,
    });
  }
};

export const obtenerCitasPorRangoFechas = async (req, res) => {
  const { inicio, fin } = req.query;
  try {
    if (!inicio || !fin) {
      return res.status(400).send({
        success: false,
        message: "Se requieren las fechas de inicio y fin",
      });
    }

    const citas = await Cita.findAll({
      where: {
        fecha: {
          [Op.between]: [new Date(inicio), new Date(fin)],
        },
      },
      include: [
        {
          model: Propiedad,
          as: "propiedad",
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: [
                "idUsuario",
                "nombre",
                "apellidoPaterno",
                "apellidoMaterno",
                "email",
                "telefono",
              ],
            },
          ],
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: [
            "idUsuario",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "email",
            "telefono",
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: citas,
      count: citas.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener citas por rango de fechas",
      error: e.message,
    });
  }
};
