import {
  Contrato,
  Usuario,
  Propiedad,
  PagoRenta,
} from "../Models/Asociaciones.js";

export const contratoController = {
  // Obtener todos los contratos
  obtenerTodos: async (req, res) => {
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
      res.status(200).json(contratos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los contratos",
        error,
      });
    }
  },

  // Obtener un contrato por ID
  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByPk(id, {
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
        return res.status(404).json({
          mensaje: "Contrato no encontrado",
        });
      }

      res.status(200).json(contrato);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener el contrato",
        error,
      });
    }
  },

  // Crear un nuevo contrato
  crear: async (req, res) => {
    try {
      const {
        idPropiedad,
        idUsuario,
        urlDoc,
        fechaInicio,
        fechaFin,
        montoMensual,
        deposito,
        estatus,
      } = req.body;

      // Validar que existan los registros relacionados
      const propiedad = await Propiedad.findByPk(idPropiedad);
      if (!propiedad) {
        return res.status(404).json({
          mensaje: "Propiedad no encontrada",
        });
      }

      const usuario = await Usuario.findByPk(idUsuario);
      if (!usuario) {
        return res.status(404).json({
          mensaje: "Usuario no encontrado",
        });
      }

      // Validar fechas
      if (new Date(fechaFin) <= new Date(fechaInicio)) {
        return res.status(400).json({
          mensaje: "La fecha de fin debe ser posterior a la fecha de inicio",
        });
      }

      const nuevoContrato = await Contrato.create({
        idPropiedad,
        idUsuario,
        urlDoc,
        fechaInicio,
        fechaFin,
        montoMensual,
        deposito,
        estatus: estatus !== undefined ? estatus : true,
      });

      // Obtener el contrato con las relaciones
      const contratoCompleto = await Contrato.findByPk(
        nuevoContrato.idContrato,
        {
          include: [
            { model: Propiedad, as: "propiedad" },
            { model: Usuario, as: "usuario" },
          ],
        }
      );

      res.status(201).json({
        mensaje: "Contrato creado exitosamente",
        contrato: contratoCompleto,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al crear el contrato",
        error,
      });
    }
  },

  // Actualizar un contrato
  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        idPropiedad,
        idUsuario,
        urlDoc,
        fechaInicio,
        fechaFin,
        montoMensual,
        deposito,
        estatus,
      } = req.body;

      const contrato = await Contrato.findByPk(id);
      if (!contrato) {
        return res.status(404).json({
          mensaje: "Contrato no encontrado",
        });
      }

      // Validar fechas
      const nuevaFechaInicio = fechaInicio || contrato.fechaInicio;
      const nuevaFechaFin = fechaFin || contrato.fechaFin;

      if (new Date(nuevaFechaFin) <= new Date(nuevaFechaInicio)) {
        return res.status(400).json({
          mensaje: "La fecha de fin debe ser posterior a la fecha de inicio",
        });
      }

      await contrato.update({
        idPropiedad,
        idUsuario,
        urlDoc,
        fechaInicio,
        fechaFin,
        montoMensual,
        deposito,
        estatus,
      });

      // Obtener el contrato actualizado con las relaciones
      const contratoActualizado = await Contrato.findByPk(id, {
        include: [
          { model: Propiedad, as: "propiedad" },
          { model: Usuario, as: "usuario" },
          { model: PagoRenta, as: "pagos" },
        ],
      });

      res.status(200).json({
        mensaje: "Contrato actualizado exitosamente",
        contrato: contratoActualizado,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al actualizar el contrato",
        error,
      });
    }
  },

  // Eliminar un contrato
  eliminar: async (req, res) => {
    try {
      const { id } = req.params;

      const contrato = await Contrato.findByPk(id);
      if (!contrato) {
        return res.status(404).json({
          mensaje: "Contrato no encontrado",
        });
      }

      await contrato.destroy();

      res.status(200).json({
        mensaje: "Contrato eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al eliminar el contrato",
        error,
      });
    }
  },

  // Obtener contratos por usuario
  obtenerPorUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      const contratos = await Contrato.findAll({
        where: { idUsuario },
        include: [
          { model: Propiedad, as: "propiedad" },
          { model: PagoRenta, as: "pagos" },
        ],
      });

      res.status(200).json(contratos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los contratos del usuario",
        error,
      });
    }
  },

  // Obtener contratos por propiedad
  obtenerPorPropiedad: async (req, res) => {
    try {
      const { idPropiedad } = req.params;

      const contratos = await Contrato.findAll({
        where: { idPropiedad },
        include: [
          { model: Usuario, as: "usuario" },
          { model: PagoRenta, as: "pagos" },
        ],
      });

      res.status(200).json(contratos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los contratos de la propiedad",
        error,
      });
    }
  },

  // Obtener contratos activos
  obtenerActivos: async (req, res) => {
    try {
      const contratos = await Contrato.findAll({
        where: { estatus: true },
        include: [
          { model: Propiedad, as: "propiedad" },
          { model: Usuario, as: "usuario" },
          { model: PagoRenta, as: "pagos" },
        ],
      });

      res.status(200).json(contratos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener los contratos activos",
        error,
      });
    }
  },

  // Actualizar estatus de un contrato
  actualizarEstatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { estatus } = req.body;

      const contrato = await Contrato.findByPk(id);
      if (!contrato) {
        return res.status(404).json({
          mensaje: "Contrato no encontrado",
        });
      }

      await contrato.update({ estatus });

      res.status(200).json({
        mensaje: "Estatus del contrato actualizado exitosamente",
        contrato,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al actualizar el estatus",
        error,
      });
    }
  },
};
