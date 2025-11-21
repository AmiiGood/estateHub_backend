import { where } from "sequelize";
import { Op } from "sequelize";
import { Propiedad } from "../Models/Propiedad.js";
import { ImagenesPropiedad } from "../Models/ImagenesPropiedad.js";
import { cloudinary } from "../Config/cloudinary.js";

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
      codigoPostal: propiedad.codigoPostal,
      tipoPropiedad: propiedad.tipoPropiedad,
      estatus: propiedad.estatus,
      precioVenta: propiedad.precioVenta,
      precioRenta: propiedad.precioRenta,
      numHabitaciones: propiedad.numHabitaciones,
      numBanios: propiedad.numBanios,
      metrosCuadrados: propiedad.metrosCuadrados,
      numEstacionamiento: propiedad.numEstacionamiento,
      plantas: propiedad.plantas,
      residencial: propiedad.residencial,
      jardin: propiedad.jardin,
      alberca: propiedad.alberca,
      sotano: propiedad.sotano,
      terraza: propiedad.terraza,
      cuartoServicio: propiedad.cuartoServicio,
      muebles: propiedad.muebles,
      credito: propiedad.credito,
      fechaRegistro: Date.now(),
      publicadoEcommerce: propiedad.publicadoEcommerce,
    });

    return res.status(200).send({
      success: true,
      message: "Propiedad registrada",
      data: newPropiedad,
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

    if (!findPropiedad) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada"
      });
    }


    const updatedPropiedad = await findPropiedad.update({
      idPropiedad: propiedad.idPropiedad,
      titulo: propiedad.titulo,
      descripcion: propiedad.descripcion,
      direccion: propiedad.direccion,
      latitud: propiedad.latitud,
      longitud: propiedad.longitud,
      colonia: propiedad.colonia,
      ciudad: propiedad.ciudad,
      estado: propiedad.estado,
      codigoPostal: propiedad.codigoPostal,
      tipoPropiedad: propiedad.tipoPropiedad,
      estatus: propiedad.estatus,
      precioVenta: propiedad.precioVenta,
      precioRenta: propiedad.precioRenta,
      numHabitaciones: propiedad.numHabitaciones,
      numBanios: propiedad.numBanios,
      metrosCuadrados: propiedad.metrosCuadrados,
      numEstacionamiento: propiedad.numEstacionamiento,
      plantas: propiedad.plantas,
      residencial: propiedad.residencial,
      jardin: propiedad.jardin,
      alberca: propiedad.alberca,
      sotano: propiedad.sotano,
      terraza: propiedad.terraza,
      cuartoServicio: propiedad.cuartoServicio,
      muebles: propiedad.muebles,
      credito: propiedad.credito,
      publicadoEcommerce: propiedad.publicadoEcommerce,

    });

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

export const obtenerPropiedades = async (req, res) => {
  try {
    const {
      ciudad,
      estado,
      tipoPropiedad,
      precioMin,
      precioMax,
      habitaciones,
      banios,
      publicadoEcommerce,
    } = req.query;

    const where = {};

    if (ciudad) where.ciudad = ciudad;
    if (estado) where.estado = estado;
    if (tipoPropiedad) where.tipoPropiedad = tipoPropiedad;

    if (precioMin || precioMax) {
      where.precioVenta = {};
      if (precioMin) where.precioVenta[Op.gte] = precioMin;
      if (precioMax) where.precioVenta[Op.lte] = precioMax;
    }

    if (habitaciones) where.numHabitaciones = habitaciones;
    if (banios) where.numBanios = banios;

    if (publicadoEcommerce !== undefined)
      where.publicadoEcommerce = publicadoEcommerce === "true";

    const propiedades = await Propiedad.findAll({
      where,
      include: [
        {
          model: ImagenesPropiedad,
          as: "imagenes",
        },
      ],
    });

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

export const obtenerPropiedad = async (req, res) => {
  const { idPropiedad } = req.params;

  if (!idPropiedad) {
    return res.status(400).send({
      success: false,
      message: "ID de propiedad es requerido",
    });
  }

  try {
    const propiedad = await Propiedad.findByPk(idPropiedad, {
      include: [
        {
          model: ImagenesPropiedad,
          as: "imagenes",
        },
      ],
    });

    if (propiedad == null) {
      return res.status(444).send({
        sucess: false,
        message: "Propiedad no encontrada",
      });
    }
    return res.status(200).json({
      success: true,
      data: propiedad,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al obtener propiedad",
      error: e.message,
    });
  }
};

export const eliminarPropiedad = async (req, res) => {
  const { idPropiedad } = req.params;
  try {
    const findPropiedad = await Propiedad.findByPk(idPropiedad);
    if (!findPropiedad) {
  return res.status(404).json({
    success: false,
    message: "Propiedad no encontrada"
  });
}



    const deletedPropiedad = await findPropiedad.destroy();

    return res.status(200).send({
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
    const propiedad = await Propiedad.findByPk(idPropiedad);

    if (!propiedad) {
      return res.status(404).send({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    await propiedad.update({ publicadoEcommerce: true });

    return res.status(200).send({
      success: true,
      message: "Propiedad publicada en ecommerce",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al publicar en ecommerce",
      error: e.message,
    });
  }
};
export const obtenerPropiedadesPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const propiedades = await Propiedad.findAll({
      include: [
        {
          model: ImagenesPropiedad,
          as: "imagenes",
        },
      ],
      where: { idUsuario },
    });

    return res.status(200).json({
      success: true,
      data: propiedades,
      count: propiedades.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener propiedades del usuario",
      error: e.message,
    });
  }
};

export const subirFotos = async (req, res) => {
  const { idPropiedad } = req.params;
  const fotos = req.files;

  try {
    const propiedad = await Propiedad.findByPk(idPropiedad);

    if (!propiedad) {
      return res.status(404).send({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    if (!fotos || fotos.length === 0) {
      return res.status(400).send({
        success: false,
        message: "No se han enviado archivos",
      });
    }

    const fotosSubidas = [];

    for (let foto of fotos) {
      const uploadedFoto = await ImagenesPropiedad.create({
        idPropiedad: propiedad.idPropiedad,
        urlImagen: foto.path,
        fechaSubida: Date.now(),
      });

      fotosSubidas.push({
        id: uploadedFoto.idImagen,
        url: foto.path,
        publicId: foto.filename,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Fotos subidas exitosamente",
      fotos: fotosSubidas,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error al subir fotos",
      error: e.message,
    });
  }
};

export const eliminarFoto = async (req, res) => {
  const { idImagen } = req.params;

  try {
    const imagen = await ImagenesPropiedad.findByPk(idImagen);

    if (!imagen) {
      return res.status(404).send({
        success: false,
        message: "Imagen no encontrada",
      });
    }

    const urlParts = imagen.urlImagen.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = `estatehub/propiedades/${
      publicIdWithExtension.split(".")[0]
    }`;

    await cloudinary.uploader.destroy(publicId);

    await imagen.destroy();

    return res.status(200).send({
      success: true,
      message: "Imagen eliminada exitosamente",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error al eliminar imagen",
      error: e.message,
    });
  }
};
