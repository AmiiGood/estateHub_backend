import { PagoRenta, Contrato, Usuario } from "../Models/Asociaciones.js";
import { Op } from "sequelize";

export const registrarPagoRenta = async (req, res) => {
  const { pagoRenta } = req.body;
  try {
    const contrato = await Contrato.findByPk(pagoRenta.idContrato, {
      include: [{ model: Usuario, as: "usuario" }],
    });

    if (!contrato) {
      return res.status(404).send({
        success: false,
        message: "Contrato no encontrado",
      });
    }

    if (!contrato.estatus) {
      return res.status(403).send({
        success: false,
        message: "No se puede registrar un pago para un contrato inactivo",
      });
    }

    if (!contrato.usuario.activo) {
      return res.status(403).send({
        success: false,
        message:
          "No se puede registrar un pago para un contrato con usuario inactivo",
      });
    }

    const nuevoPago = await PagoRenta.create({
      idContrato: pagoRenta.idContrato,
      monto: pagoRenta.monto,
      fechaVencimiento: new Date(pagoRenta.fechaVencimiento),
      fechaPago: pagoRenta.fechaPago ? new Date(pagoRenta.fechaPago) : null,
      estatus: pagoRenta.estatus,
      metodoPago: pagoRenta.metodoPago,
      referencia: pagoRenta.referencia,
      notas: pagoRenta.notas,
    });

    return res.status(200).send({
      success: true,
      message: "Pago de renta registrado",
      data: nuevoPago,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error al registrar pago de renta",
      error: e.message,
    });
  }
};

export const updatePagoRenta = async (req, res) => {
  const { pagoRenta } = req.body;
  try {
    const findPago = await PagoRenta.findByPk(pagoRenta.idPago);

    if (!findPago) {
      return res.status(404).send({
        success: false,
        message: "Pago de renta no encontrado",
      });
    }

    if (pagoRenta.idContrato && pagoRenta.idContrato !== findPago.idContrato) {
      const nuevoContrato = await Contrato.findByPk(pagoRenta.idContrato, {
        include: [{ model: Usuario, as: "usuario" }],
      });

      if (!nuevoContrato) {
        return res.status(404).send({
          success: false,
          message: "Contrato no encontrado",
        });
      }

      if (!nuevoContrato.estatus) {
        return res.status(403).send({
          success: false,
          message: "No se puede asignar un pago a un contrato inactivo",
        });
      }

      if (!nuevoContrato.usuario.activo) {
        return res.status(403).send({
          success: false,
          message:
            "No se puede asignar un pago a un contrato con usuario inactivo",
        });
      }
    }

    await findPago.update(pagoRenta);

    return res.status(200).send({
      success: true,
      message: "Pago de renta actualizado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al actualizar pago de renta",
      error: e.message,
    });
  }
};

export const obtenerPagosRenta = async (req, res) => {
  try {
    const pagos = await PagoRenta.findAll({
      include: [
        {
          model: Contrato,
          as: "contrato",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: pagos,
      count: pagos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener pagos de renta",
      error: e.message,
    });
  }
};

export const obtenerPagoRentaPorId = async (req, res) => {
  const { idPago } = req.params;
  try {
    const pago = await PagoRenta.findByPk(idPago, {
      include: [{ model: Contrato, as: "contrato" }],
    });

    if (!pago) {
      return res.status(404).send({
        success: false,
        message: "Pago de renta no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      data: pago,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener pago de renta",
      error: e.message,
    });
  }
};

export const eliminarPagoRenta = async (req, res) => {
  const { idPago } = req.params;
  try {
    const findPago = await PagoRenta.findByPk(idPago);

    if (!findPago) {
      return res.status(404).send({
        success: false,
        message: "Pago de renta no encontrado",
      });
    }

    await findPago.destroy();

    return res.status(200).send({
      success: true,
      message: "Pago de renta eliminado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al eliminar pago de renta",
      error: e.message,
    });
  }
};

export const obtenerPagosRentaPorContrato = async (req, res) => {
  const { idContrato } = req.params;
  try {
    const pagos = await PagoRenta.findAll({
      where: { idContrato },
      include: [{ model: Contrato, as: "contrato" }],
    });

    return res.status(200).json({
      success: true,
      data: pagos,
      count: pagos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener pagos por contrato",
      error: e.message,
    });
  }
};

export const obtenerPagosRentaPorEstatus = async (req, res) => {
  const { estatus } = req.params;
  try {
    const pagos = await PagoRenta.findAll({
      where: { estatus },
      include: [{ model: Contrato, as: "contrato" }],
    });

    return res.status(200).json({
      success: true,
      data: pagos,
      count: pagos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener pagos por estatus",
      error: e.message,
    });
  }
};

export const obtenerPagosRentaPorRangoFechas = async (req, res) => {
  const { inicio, fin } = req.query;
  try {
    if (!inicio || !fin) {
      return res.status(400).send({
        success: false,
        message: "Se requieren las fechas de inicio y fin",
      });
    }

    const pagos = await PagoRenta.findAll({
      where: {
        fechaPago: {
          [Op.between]: [new Date(inicio), new Date(fin)],
        },
      },
      include: [{ model: Contrato, as: "contrato" }],
    });

    return res.status(200).json({
      success: true,
      data: pagos,
      count: pagos.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener pagos por rango de fechas",
      error: e.message,
    });
  }
};

export const actualizarEstatusPagoRenta = async (req, res) => {
  const { idPago } = req.params;
  const { estatus } = req.body;
  try {
    const findPago = await PagoRenta.findByPk(idPago);

    if (!findPago) {
      return res.status(404).send({
        success: false,
        message: "Pago de renta no encontrado",
      });
    }

    const estatusValidos = ["pago_pendiente", "pago_recibido", "en_proceso"];
    if (estatus && !estatusValidos.includes(estatus.toLowerCase())) {
      return res.status(400).send({
        success: false,
        message: `Estatus no válido. Los estatus válidos son: ${estatusValidos.join(
          ", "
        )}`,
      });
    }

    await findPago.update({ estatus });

    return res.status(200).send({
      success: true,
      message: "Estatus del pago de renta actualizado",
      data: findPago,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al actualizar estatus del pago",
      error: e.message,
    });
  }
};
