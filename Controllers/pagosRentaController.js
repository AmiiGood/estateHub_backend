import { PagoRenta, Contrato } from "../Models/Asociaciones.js";
import { Op } from "sequelize";

export const pagoRentaController = {
  // Obtener todos los pagos de renta
  obtenerTodos: async (req, res) => {
    try {
      const pagos = await PagoRenta.findAll({
        include: [
          {
            model: Contrato,
            as: "contrato",
          },
        ],
      });

      res.status(200).json(pagos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los pagos de renta",
        error,
      });
    }
  },

  // Obtener un pago por ID
  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;

      const pago = await PagoRenta.findByPk(id, {
        include: [{ model: Contrato, as: "contrato" }],
      });

      if (!pago) {
        return res.status(404).json({
          mensaje: "Pago de renta no encontrado",
        });
      }

      res.status(200).json(pago);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener el pago de renta",
        error,
      });
    }
  },

  // Crear un nuevo pago de renta
  crear: async (req, res) => {
    try {
      const {
        idContrato,
        monto,
        fechaVencimiento,
        fechaPago,
        estatus,
        metodoPago,
        referencia,
        notas,
      } = req.body;

      // Validar contrato existente
      const contrato = await Contrato.findByPk(idContrato);
      if (!contrato) {
        return res.status(404).json({
          mensaje: "Contrato no encontrado",
        });
      }

      // Validar fechas
      if (new Date(fechaPago) < new Date(fechaVencimiento)) {
        return res.status(400).json({
          mensaje:
            "La fecha de pago no puede ser anterior a la fecha de vencimiento",
        });
      }

      // Crear pago
      const nuevoPago = await PagoRenta.create({
        idContrato,
        monto,
        fechaVencimiento: new Date(fechaVencimiento),
        fechaPago: new Date(fechaPago),
        estatus,
        metodoPago,
        referencia,
        notas,
      });

      // Obtener el pago con su contrato
      const pagoCompleto = await PagoRenta.findByPk(nuevoPago.idPago, {
        include: [{ model: Contrato, as: "contrato" }],
      });

      res.status(201).json({
        mensaje: "Pago de renta creado exitosamente",
        pago: pagoCompleto,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al crear el pago de renta",
        error,
      });
    }
  },

  // Actualizar un pago de renta
  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        idContrato,
        monto,
        fechaVencimiento,
        fechaPago,
        estatus,
        metodoPago,
        referencia,
        notas,
      } = req.body;

      const pago = await PagoRenta.findByPk(id);
      if (!pago) {
        return res.status(404).json({
          mensaje: "Pago de renta no encontrado",
        });
      }

      // Validar contrato si se envia
      if (idContrato) {
        const contrato = await Contrato.findByPk(idContrato);
        if (!contrato) {
          return res.status(404).json({
            mensaje: "Contrato no encontrado",
          });
        }
      }

      // Validar fechas si ambas están presentes
      if (
        fechaPago &&
        fechaVencimiento &&
        new Date(fechaPago) < new Date(fechaVencimiento)
      ) {
        return res.status(400).json({
          mensaje:
            "La fecha de pago no puede ser anterior a la fecha de vencimiento",
        });
      }

      await pago.update({
        idContrato: idContrato || pago.idContrato,
        monto: monto || pago.monto,
        fechaVencimiento: fechaVencimiento
          ? new Date(fechaVencimiento)
          : pago.fechaVencimiento,
        fechaPago: fechaPago ? new Date(fechaPago) : pago.fechaPago,
        estatus: estatus || pago.estatus,
        metodoPago: metodoPago || pago.metodoPago,
        referencia: referencia || pago.referencia,
        notas: notas || pago.notas,
      });

      const pagoActualizado = await PagoRenta.findByPk(id, {
        include: [{ model: Contrato, as: "contrato" }],
      });

      res.status(200).json({
        mensaje: "Pago de renta actualizado exitosamente",
        pago: pagoActualizado,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al actualizar el pago de renta",
        error,
      });
    }
  },

  // Eliminar un pago de renta
  eliminar: async (req, res) => {
    try {
      const { id } = req.params;

      const pago = await PagoRenta.findByPk(id);
      if (!pago) {
        return res.status(404).json({
          mensaje: "Pago de renta no encontrado",
        });
      }

      await pago.destroy();

      res.status(200).json({
        mensaje: "Pago de renta eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al eliminar el pago de renta",
        error,
      });
    }
  },

  // Obtener pagos por contrato
  obtenerPorContrato: async (req, res) => {
    try {
      const { idContrato } = req.params;

      const pagos = await PagoRenta.findAll({
        where: { idContrato },
        include: [{ model: Contrato, as: "contrato" }],
      });

      res.status(200).json(pagos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los pagos por contrato",
        error,
      });
    }
  },

  // Obtener pagos por estatus (pendiente, recibido, en proceso)
  obtenerPorEstatus: async (req, res) => {
    try {
      const { estatus } = req.params;

      const pagos = await PagoRenta.findAll({
        where: { estatus },
        include: [{ model: Contrato, as: "contrato" }],
      });

      res.status(200).json(pagos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los pagos por estatus",
        error,
      });
    }
  },

  // Obtener pagos por rango de fechas
  obtenerPorRangoFechas: async (req, res) => {
    try {
      const { inicio, fin } = req.query;

      const pagos = await PagoRenta.findAll({
        where: {
          fechaPago: {
            [Op.between]: [new Date(inicio), new Date(fin)],
          },
        },
        include: [{ model: Contrato, as: "contrato" }],
      });

      res.status(200).json(pagos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los pagos por rango de fechas",
        error,
      });
    }
  },
};
