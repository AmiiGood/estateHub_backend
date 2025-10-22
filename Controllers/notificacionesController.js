import { Notificacion } from "../Models/Notificacion.js";
import e from "cors";

export const agregarNotificacion = async (req, res) => {
    const { notificacion } = req.body;
    try{
        console.log(notificacion);
        const newNotificacion = await Notificacion.create({
            idUsuario: notificacion.idUsuario,
            tipo: notificacion.tipo,
            titulo: notificacion.titulo,
            mensaje: notificacion.mensaje,
            leida: notificacion.leida,
            fechaEnvio: notificacion.fechaEnvio,
            fechaRegistro: notificacion.fechaRegistro,
        });

        return res.status(200).send({
            message: "Notificacion agregada",
        });
    } catch (e){
        console.log(e);
        return res.status(500).send({
            message: "Error al agregar la notificacion"
        })
    }
};


export const editarNotificacion = async (req, res) => {
    const { idNotificacion } = req.params;
    const { notificacion } = req.body;
    
    try {
        if (!idNotificacion) {
            return res.status(400).send({
                message: "ID de notificación es requerido"
            });
        }

        const result = await Notificacion.update({
            idUsuario: notificacion.idUsuario,
            tipo: notificacion.tipo,
            titulo: notificacion.titulo,
            mensaje: notificacion.mensaje,
            leida: notificacion.leida,
            fechaEnvio: notificacion.fechaEnvio,
            fechaRegistro: notificacion.fechaRegistro,
        }, {
            where: {
                idNotificacion: idNotificacion 
            }
        });

        if (result[0] === 0) {
            return res.status(404).send({
                message: "Notificación no encontrada"
            });
        }

        return res.status(200).send({
            message: "Notificación editada correctamente",
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Error al editar la notificación"
        });
    }
};


export const getAllNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificacion.findAll({
            order: [['fechaEnvio', 'DESC']] 
        });

        return res.status(200).send({
            message: "Notificaciones obtenidas correctamente",
            data: notificaciones
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Error al obtener las notificaciones"
        });
    }
};


export const getNotificacion = async (req, res) => {
  const { idNotificacion } = req.params;
  
  if (!idNotificacion) {
    return res.status(400).send({
      message: "ID de notificación es requerido",
    });
  }

  try {
    const notificacion = await Notificacion.findByPk(idNotificacion);
    
    if (!notificacion) {
      return res.status(404).send({
        message: "Notificación no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: notificacion,
    });
    
  } catch (error) {
    console.error("Error al obtener notificación:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener la notificación",
    });
  }
};


export const eliminarNotificacion = async (req, res) => {
  const { idNotificacion } = req.params;
  
  try {
    const findNotificacion = await Notificacion.findByPk(idNotificacion);

    if (!findNotificacion) {
      return res.status(404).send({
        success: false,
        message: "Notificación no encontrada",
      });
    }

    const deletedNotificacion = await findNotificacion.destroy();

    return res.status(200).send({
      success: true,
      message: "Notificación eliminada correctamente",
    });
    
  } catch (error) {
    console.error("Error al eliminar notificación:", error);
    return res.status(500).send({
      success: false,
      message: "Error al eliminar la notificación",
      error: error.message,
    });
  }
};

