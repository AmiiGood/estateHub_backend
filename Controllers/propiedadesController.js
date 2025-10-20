import { where } from "sequelize";
import { Propiedad } from "../Models/Propiedad.js";

export const registrarPropiedad = async (req, res) => {
  const { propiedad } = req.body;
  try {
    console.log(propiedad);
    const newPropiedad = await Propiedad.create({
      idUsuario: propiedad.idUsuario,
      titulo: propiedad.titulo,
      descripcion: propiedad.descripcion,
      direccion: propiedad.direccion,
      latitud: propiedad.latitud,
      longitud: propiedad.longitud,
      colonia: propiedad.colonia,
      ciudad: propiedad.ciudad,
      estado: propiedad.estado,
      codigo_postal: propiedad.codigo_postal,
      tipo_propiedad: propiedad.tipo_propiedad,
      estatus: propiedad.estatus,
      precio_venta: propiedad.precio_venta,
      precio_renta: propiedad.precio_renta,
      num_habitaciones: propiedad.num_habitaciones,
      num_banios: propiedad.num_banios,
      metros_cuadrados: propiedad.metros_cuadrados,
      num_estacionamiento: propiedad.num_estacionamiento,
      plantas: propiedad.plantas,
      residencial: propiedad.residencial,
      jardin: propiedad.jardin,
      alberca: propiedad.alberca,
      sotano: propiedad.sotano,
      terraza: propiedad.terraza,
      cuarto_servicio: propiedad.cuarto_servicio,
      muebles: propiedad.muebles,
      credito: propiedad.credito,
      fecha_registro: propiedad.fecha_registro,
      publicado_ecommerce: propiedad.publicado_ecommerce,
    });

    return res.status(200).send({
      succes: true,
      message: "Propiedad registrada",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      data: "Error al registrar propiedade",
      error: e.message,
    });
  }
};

export const updatePropiedad = async (req, res) => {
  const { propiedad } = req.body;

  try {
    const findPropiedad = await Propiedad.findByPk(propiedad.idPropiedad);

    const updatedPropiedad = await findPropiedad.update({ propiedad });

    return res.status(200).send({
      success: true,
      message: "Propiedad actualizada",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al editar propiedades",
      error: e.message,
    });
  }
};

export const obtenerPropiedad = async (req, res) => {
  try {
    const propiedades = await Propiedad.findAll();

    return res.status(200).json({
      success: true,
      data: propiedades,
      count: propiedades.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al obtener propiedades",
      error: e.message,
    });
  }
};

export const eliminarPropiedad = async (req, res) => {
  const { idPropiedad } = req.params;
  try {
    const findPropiedad = await Propiedad.findByPk(idPropiedad);

    const deletedPropiedad = await findPropiedad.destroy();

    return res.send(200).send({
      success: true,
      message: "Propiedad eliminada",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al eliminar propiedades",
      error: e.message,
    });
  }
};

export const publicarEcommerce = async (req, res) => {
  const { idPropiedad } = req.params;
  try {
    const findPropiedad = await Propiedad.findByPk(idPropiedad);

    const pulicatedPropiedad = await Propiedad.update(
      { publicado_ecommerce: true },
      (where = { idPropiedad: idPropiedad })
    );
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al publicar en ecommerce",
      error: e.message,
    });
  }
};
