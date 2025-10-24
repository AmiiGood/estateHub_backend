import { Cita, Usuario, Propiedad } from "../Models/Asociaciones.js";

export const registrarCita = async (req, res) => {
  const { cita } = req.body;
  try {
    // Validar que existan los registros relacionados
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

    const responsable = await Usuario.findByPk(cita.idResponsable);
    if (!responsable) {
      return res.status(404).send({
        success: false,
        message: "Responsable no encontrado",
      });
    }

    const nuevaCita = await Cita.create({
      idPropiedad: cita.idPropiedad,
      idUsuario: cita.idUsuario,
      idResponsable: cita.idResponsable,
      fecha: cita.fecha,
      estatus: cita.estatus,
    });

    return res.status(200).send({
      success: true,
      message: "Cita registrada",
      data: nuevaCita,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error al registrar cita",
      error: e.message,
    });
  }
};

export const updateCita = async (req, res) => {
  const { cita } = req.body;
  try {
    const findCita = await Cita.findByPk(cita.idCita);

    if (!findCita) {
      return res.status(404).send({
        success: false,
        message: "Cita no encontrada",
      });
    }

    await findCita.update(cita);

    return res.status(200).send({
      success: true,
      message: "Cita actualizada",
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
        },
        {
          model: Usuario,
          as: "usuario",
        },
        {
          model: Usuario,
          as: "responsable",
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
        },
        {
          model: Usuario,
          as: "usuario",
        },
        {
          model: Usuario,
          as: "responsable",
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
      message: "Cita eliminada",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al eliminar cita",
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
        { model: Propiedad, as: "propiedad" },
        { model: Usuario, as: "responsable" },
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
      message: "Error al obtener citas del usuario",
      error: e.message,
    });
  }
};

export const obtenerCitasPorResponsable = async (req, res) => {
  const { idResponsable } = req.params;
  try {
    const citas = await Cita.findAll({
      where: { idResponsable },
      include: [
        { model: Propiedad, as: "propiedad" },
        { model: Usuario, as: "usuario" },
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
      message: "Error al obtener citas del responsable",
      error: e.message,
    });
  }
};

export const actualizarEstatusCita = async (req, res) => {
  const { idCita } = req.params;
  const { estatus } = req.body;
  try {
    const findCita = await Cita.findByPk(idCita);

    if (!findCita) {
      return res.status(404).send({
        success: false,
        message: "Cita no encontrada",
      });
    }

    await findCita.update({ estatus });

    return res.status(200).send({
      success: true,
      message: "Estatus de la cita actualizado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al actualizar estatus",
      error: e.message,
    });
  }
};