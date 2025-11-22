import { Cita, Propiedad, Usuario } from "../Models/Asociaciones.js";
import { Op } from "sequelize";

//Funciones auxiliares de validacion
const validarFechaYHoraCita = (fecha) => {
  const fechaCita = new Date(fecha);
  const ahora = new Date();

  // Validar que la fecha no sea en el pasado
  if (fechaCita < ahora) {
    return {
      valida: false,
      mensaje: "No se puede agendar una cita en una fecha pasada",
    };
  }

  // Validar que no sea el mismo dia
  const mañana = new Date(ahora);
  mañana.setDate(mañana.getDate() + 1);
  mañana.setHours(0, 0, 0, 0);

  if (fechaCita < mañana) {
    return {
      valida: false,
      mensaje: "Las citas deben agendarse con al menos 1 dia de anticipacion",
    };
  }

  // Validar horario(8:00 AM - 8:00 PM)
  const hora = fechaCita.getHours();
  const minutos = fechaCita.getMinutes();

  if (hora < 8 || hora >= 20) {
    return {
      valida: false,
      mensaje:
        "Las citas solo pueden agendarse entre las 8:00 AM y las 8:00 PM",
    };
  }

  // Validar que los minutos sean 00 o 30
  if (minutos !== 0 && minutos !== 30) {
    return {
      valida: false,
      mensaje:
        "Las citas solo pueden agendarse en intervalos de 30 minutos (:00 o :30)",
    };
  }

  // Validar que no sea domingo
  const diaSemana = fechaCita.getDay();
  if (diaSemana === 0) {
    return {
      valida: false,
      mensaje: "No se pueden agendar citas los domingos",
    };
  }

  // Validar que no sea mas de 3 meses en el futuro
  const tresMesesAdelante = new Date(ahora);
  tresMesesAdelante.setMonth(tresMesesAdelante.getMonth() + 3);

  if (fechaCita > tresMesesAdelante) {
    return {
      valida: false,
      mensaje:
        "Las citas no pueden agendarse con mas de 3 meses de anticipacion",
    };
  }

  return { valida: true };
};

const verificarDisponibilidad = async (
  idPropiedad,
  fecha,
  idCitaActual = null
) => {
  const fechaCita = new Date(fecha);

  // Buscar si ya existe una cita en ese horario para esa propiedad
  const whereClause = {
    idPropiedad,
    fecha: fechaCita,
    estatus: {
      [Op.ne]: "cancelada",
    },
  };

  if (idCitaActual) {
    whereClause.idCita = {
      [Op.ne]: idCitaActual,
    };
  }

  const citaExistente = await Cita.findOne({
    where: whereClause,
  });

  if (citaExistente) {
    return {
      disponible: false,
      mensaje: "Ya existe una cita agendada para esta propiedad en ese horario",
    };
  }

  return { disponible: true };
};

export const crearCita = async (req, res) => {
  const { cita } = req.body;
  try {
    // Validar que la propiedad existe
    const propiedad = await Propiedad.findByPk(cita.idPropiedad);
    if (!propiedad) {
      return res.status(404).send({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    // Validar que el usuario existe
    const usuario = await Usuario.findByPk(cita.idUsuario);
    if (!usuario) {
      return res.status(404).send({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Validar que el usuario este activo
    if (!usuario.activo) {
      return res.status(403).send({
        success: false,
        message: "No se puede crear una cita con un usuario inactivo",
      });
    }

    // Validar que el dueño no agende cita en su propia propiedad
    if (propiedad.idUsuario === cita.idUsuario) {
      return res.status(400).send({
        success: false,
        message:
          "El dueño de la propiedad no puede agendar una cita para su propia propiedad",
      });
    }

    // Validar fecha y horario
    const validacionFecha = validarFechaYHoraCita(cita.fecha);
    if (!validacionFecha.valida) {
      return res.status(400).send({
        success: false,
        message: validacionFecha.mensaje,
      });
    }

    // Verificar disponibilidad del horario
    const disponibilidad = await verificarDisponibilidad(
      cita.idPropiedad,
      cita.fecha
    );

    if (!disponibilidad.disponible) {
      return res.status(409).send({
        success: false,
        message: disponibilidad.mensaje,
      });
    }

    // Verificar que el usuario no tenga mas de 3 citas pendientes
    const citasPendientes = await Cita.count({
      where: {
        idUsuario: cita.idUsuario,
        estatus: "en_proceso",
        fecha: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (citasPendientes >= 3) {
      return res.status(400).send({
        success: false,
        message: "No puedes tener mas de 3 citas pendientes al mismo tiempo",
      });
    }

    // Crear la cita
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

    let propiedad;
    if (cita.idPropiedad) {
      propiedad = await Propiedad.findByPk(cita.idPropiedad);
      if (!propiedad) {
        return res.status(404).send({
          success: false,
          message: "Propiedad no encontrada",
        });
      }
    } else {
      propiedad = await Propiedad.findByPk(findCita.idPropiedad);
    }

    if (cita.idUsuario) {
      const usuario = await Usuario.findByPk(cita.idUsuario);
      if (!usuario) {
        return res.status(404).send({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      if (!usuario.activo) {
        return res.status(403).send({
          success: false,
          message: "No se puede asignar una cita a un usuario inactivo",
        });
      }

      if (propiedad.idUsuario === cita.idUsuario) {
        return res.status(400).send({
          success: false,
          message:
            "El dueño de la propiedad no puede agendar una cita para su propia propiedad",
        });
      }
    }

    // Si se esta actualizando la fecha, validar
    if (cita.fecha) {
      const validacionFecha = validarFechaYHoraCita(cita.fecha);
      if (!validacionFecha.valida) {
        return res.status(400).send({
          success: false,
          message: validacionFecha.mensaje,
        });
      }

      // Verificar disponibilidad (excluyendo la cita actual)
      const idPropiedadFinal = cita.idPropiedad || findCita.idPropiedad;
      const disponibilidad = await verificarDisponibilidad(
        idPropiedadFinal,
        cita.fecha,
        cita.idCita
      );

      if (!disponibilidad.disponible) {
        return res.status(409).send({
          success: false,
          message: disponibilidad.mensaje,
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

export const obtenerHorariosDisponibles = async (req, res) => {
  const { idPropiedad, fecha } = req.query;

  try {
    if (!idPropiedad || !fecha) {
      return res.status(400).send({
        success: false,
        message: "Se requiere idPropiedad y fecha",
      });
    }

    const fechaConsulta = new Date(fecha + "T00:00:00");

    const finDia = new Date(fechaConsulta);
    finDia.setDate(finDia.getDate() + 1);
    finDia.setMilliseconds(-1);

    console.log("Buscando citas entre:", fechaConsulta, "y", finDia);

    // Obtener todas las citas de ese dia para esa propiedad
    const citasDelDia = await Cita.findAll({
      where: {
        idPropiedad,
        fecha: {
          [Op.gte]: fechaConsulta,
          [Op.lt]: finDia,
        },
        estatus: {
          [Op.ne]: "cancelada",
        },
      },
    });

    console.log("Citas encontradas:", citasDelDia.length);
    citasDelDia.forEach((c) => {
      console.log("Cita:", c.idCita, "Fecha:", c.fecha);
    });

    const horariosOcupados = new Set();

    citasDelDia.forEach((c) => {
      const fechaCita = new Date(c.fecha);
      fechaCita.setSeconds(0, 0);
      const timestamp = fechaCita.getTime();
      horariosOcupados.add(timestamp);
      console.log(
        "Horario ocupado:",
        fechaCita.toISOString(),
        "Timestamp:",
        timestamp
      );
    });

    // Generar todos los horarios posibles
    const horariosDisponibles = [];

    for (let hora = 8; hora < 20; hora++) {
      for (let minuto of [0, 30]) {
        const horario = new Date(fechaConsulta);
        horario.setHours(hora, minuto, 0, 0);

        const timestamp = horario.getTime();

        // Verificar si este horario esta ocupado
        const estaOcupado = horariosOcupados.has(timestamp);

        if (!estaOcupado) {
          horariosDisponibles.push({
            fecha: horario.toISOString(),
            horaLocal: `${hora.toString().padStart(2, "0")}:${minuto
              .toString()
              .padStart(2, "0")}`,
            disponible: true,
          });
        } else {
          console.log(`Horario ${hora}:${minuto} esta ocupado`);
        }
      }
    }

    return res.status(200).json({
      success: true,
      fecha: fecha,
      totalCitas: citasDelDia.length,
      data: horariosDisponibles,
      count: horariosDisponibles.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error al obtener horarios disponibles",
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

    const estatusValidos = ["en_proceso", "cancelada", "completada"];
    if (estatus && !estatusValidos.includes(estatus.toLowerCase())) {
      return res.status(400).send({
        success: false,
        message: `Estatus no valido. Los estatus validos son: ${estatusValidos.join(
          ", "
        )}`,
      });
    }

    await findCita.update({ estatus });

    return res.status(200).send({
      success: true,
      message: "Estatus de la cita actualizado",
      data: findCita,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al actualizar estatus de la cita",
      error: e.message,
    });
  }
};
