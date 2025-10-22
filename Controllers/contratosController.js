import {
  Contrato,
  Usuario,
  Propiedad,
  PagoRenta,
} from "../Models/Asociaciones.js";

export const registrarContrato = async (req, res) => {
  const { contrato } = req.body;
  try {
    // Validar que existan los registros relacionados
    const propiedad = await Propiedad.findByPk(contrato.idPropiedad);
    if (!propiedad) {
      return res.status(404).send({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const usuario = await Usuario.findByPk(contrato.idUsuario);
    if (!usuario) {
      return res.status(404).send({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Validar fechas
    if (new Date(contrato.fechaFin) <= new Date(contrato.fechaInicio)) {
      return res.status(400).send({
        success: false,
        message: "La fecha de fin debe ser posterior a la fecha de inicio",
      });
    }

    const nuevoContrato = await Contrato.create({
      idPropiedad: contrato.idPropiedad,
      idUsuario: contrato.idUsuario,
      urlDoc: contrato.urlDoc,
      fechaInicio: contrato.fechaInicio,
      fechaFin: contrato.fechaFin,
      montoMensual: contrato.montoMensual,
      deposito: contrato.deposito,
      estatus: contrato.estatus !== undefined ? contrato.estatus : true,
    });

    return res.status(200).send({
      success: true,
      message: "Contrato registrado",
      data: nuevoContrato,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error al registrar contrato",
      error: e.message,
    });
  }
};

export const updateContrato = async (req, res) => {
  const { contrato } = req.body;
  try {
    const findContrato = await Contrato.findByPk(contrato.idContrato);

    if (!findContrato) {
      return res.status(404).send({
        success: false,
        message: "Contrato no encontrado",
      });
    }

    // Validar fechas
    const nuevaFechaInicio = contrato.fechaInicio || findContrato.fechaInicio;
    const nuevaFechaFin = contrato.fechaFin || findContrato.fechaFin;

    if (new Date(nuevaFechaFin) <= new Date(nuevaFechaInicio)) {
      return res.status(400).send({
        success: false,
        message: "La fecha de fin debe ser posterior a la fecha de inicio",
      });
    }

    await findContrato.update(contrato);

    return res.status(200).send({
      success: true,
      message: "Contrato actualizado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al actualizar contrato",
      error: e.message,
    });
  }
};

export const obtenerContratos = async (req, res) => {
  try {
    const contratos = await Contrato.findAll({
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
          model: PagoRenta,
          as: "pagos",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: contratos,
      count: contratos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener contratos",
      error: e.message,
    });
  }
};

export const obtenerContratoPorId = async (req, res) => {
  const { idContrato } = req.params;
  try {
    const contrato = await Contrato.findByPk(idContrato, {
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
          model: PagoRenta,
          as: "pagos",
        },
      ],
    });

    if (!contrato) {
      return res.status(404).send({
        success: false,
        message: "Contrato no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      data: contrato,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener contrato",
      error: e.message,
    });
  }
};

export const eliminarContrato = async (req, res) => {
  const { idContrato } = req.params;
  try {
    const findContrato = await Contrato.findByPk(idContrato);

    if (!findContrato) {
      return res.status(404).send({
        success: false,
        message: "Contrato no encontrado",
      });
    }

    await findContrato.destroy();

    return res.status(200).send({
      success: true,
      message: "Contrato eliminado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al eliminar contrato",
      error: e.message,
    });
  }
};

export const obtenerContratosPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const contratos = await Contrato.findAll({
      where: { idUsuario },
      include: [
        { model: Propiedad, as: "propiedad" },
        { model: PagoRenta, as: "pagos" },
      ],
    });

    return res.status(200).json({
      success: true,
      data: contratos,
      count: contratos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener contratos del usuario",
      error: e.message,
    });
  }
};

export const obtenerContratosPorPropiedad = async (req, res) => {
  const { idPropiedad } = req.params;
  try {
    const contratos = await Contrato.findAll({
      where: { idPropiedad },
      include: [
        { model: Usuario, as: "usuario" },
        { model: PagoRenta, as: "pagos" },
      ],
    });

    return res.status(200).json({
      success: true,
      data: contratos,
      count: contratos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener contratos de la propiedad",
      error: e.message,
    });
  }
};

export const obtenerContratosActivos = async (req, res) => {
  try {
    const contratos = await Contrato.findAll({
      where: { estatus: true },
      include: [
        { model: Propiedad, as: "propiedad" },
        { model: Usuario, as: "usuario" },
        { model: PagoRenta, as: "pagos" },
      ],
    });

    return res.status(200).json({
      success: true,
      data: contratos,
      count: contratos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener contratos activos",
      error: e.message,
    });
  }
};

export const actualizarEstatusContrato = async (req, res) => {
  const { idContrato } = req.params;
  const { estatus } = req.body;
  try {
    const findContrato = await Contrato.findByPk(idContrato);

    if (!findContrato) {
      return res.status(404).send({
        success: false,
        message: "Contrato no encontrado",
      });
    }

    await findContrato.update({ estatus });

    return res.status(200).send({
      success: true,
      message: "Estatus del contrato actualizado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al actualizar estatus",
      error: e.message,
    });
  }
};