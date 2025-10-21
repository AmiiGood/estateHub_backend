import { Cita, Usuario, Propiedad } from "../Models/Asociaciones.js";

export const citaController = {
  // Obtener todas las citas
  obtenerTodas: async (req, res) => {
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
      res.status(200).json(citas);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener las citas",
        error,
      });
    }
  },

  // Obtener una cita por ID
  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const cita = await Cita.findByPk(id, {
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
        return res.status(404).json({
          mensaje: "Cita no encontrada",
        });
      }

      res.status(200).json(cita);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener la cita",
        error,
      });
    }
  },

  // Crear una nueva cita
  crear: async (req, res) => {
    try {
      const { idPropiedad, idUsuario, idResponsable, fecha, estatus } =
        req.body;

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

      const responsable = await Usuario.findByPk(idResponsable);
      if (!responsable) {
        return res.status(404).json({
          mensaje: "Responsable no encontrado",
        });
      }

      const nuevaCita = await Cita.create({
        idPropiedad,
        idUsuario,
        idResponsable,
        fecha,
        estatus,
      });

      // Obtener la cita con las relaciones
      const citaCompleta = await Cita.findByPk(nuevaCita.idCita, {
        include: [
          { model: Propiedad, as: "propiedad" },
          { model: Usuario, as: "usuario" },
          { model: Usuario, as: "responsable" },
        ],
      });

      res.status(201).json({
        mensaje: "Cita creada exitosamente",
        cita: citaCompleta,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al crear la cita",
        error,
      });
    }
  },

  // Actualizar una cita
  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { idPropiedad, idUsuario, idResponsable, fecha, estatus } =
        req.body;

      const cita = await Cita.findByPk(id);
      if (!cita) {
        return res.status(404).json({
          mensaje: "Cita no encontrada",
        });
      }

      await cita.update({
        idPropiedad,
        idUsuario,
        idResponsable,
        fecha,
        estatus,
      });

      // Obtener la cita actualizada con las relaciones
      const citaActualizada = await Cita.findByPk(id, {
        include: [
          { model: Propiedad, as: "propiedad" },
          { model: Usuario, as: "usuario" },
          { model: Usuario, as: "responsable" },
        ],
      });

      res.status(200).json({
        mensaje: "Cita actualizada exitosamente",
        cita: citaActualizada,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al actualizar la cita",
        error,
      });
    }
  },

  // Eliminar una cita logicamente por el paranoid
  eliminar: async (req, res) => {
    try {
      const { id } = req.params;

      const cita = await Cita.findByPk(id);
      if (!cita) {
        return res.status(404).json({
          mensaje: "Cita no encontrada",
        });
      }

      await cita.destroy();

      res.status(200).json({
        mensaje: "Cita eliminada exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al eliminar la cita",
        error,
      });
    }
  },

  // Obtener citas por usuario
  obtenerPorUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      const citas = await Cita.findAll({
        where: { idUsuario },
        include: [
          { model: Propiedad, as: "propiedad" },
          { model: Usuario, as: "responsable" },
        ],
      });

      res.status(200).json(citas);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener las citas del usuario",
        error,
      });
    }
  },

  // Obtener citas por responsable
  obtenerPorResponsable: async (req, res) => {
    try {
      const { idResponsable } = req.params;

      const citas = await Cita.findAll({
        where: { idResponsable },
        include: [
          { model: Propiedad, as: "propiedad" },
          { model: Usuario, as: "usuario" },
        ],
      });

      res.status(200).json(citas);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener las citas del responsable",
        error,
      });
    }
  },

  // Actualizar estatus de una cita
  actualizarEstatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { estatus } = req.body;

      const cita = await Cita.findByPk(id);
      if (!cita) {
        return res.status(404).json({
          mensaje: "Cita no encontrada",
        });
      }

      await cita.update({ estatus });

      res.status(200).json({
        mensaje: "Estatus actualizado exitosamente",
        cita,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al actualizar el estatus",
        error,
      });
    }
  },
};
