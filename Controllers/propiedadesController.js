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
      message: "Propiedad registrada",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error al registrar propiedad",
    });
  }
};
