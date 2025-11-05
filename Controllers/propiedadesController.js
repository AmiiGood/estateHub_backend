import { where } from "sequelize";
import { Propiedad } from "../Models/Propiedad.js";
import { ImagenesPropiedad } from "../Models/ImagenesPropiedad.js";

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
      publicarEcommerce: propiedad.publicadoEcommerce,
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
    const propiedades = await Propiedad.findAll({
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

export const subirFotos = async (req, res) => {
  const { idPropiedad } = req.params;
  const fotos = req.files;
  try {
    const baseURL = `http://localhost:3000/uploads/`;
    const propiedad = await Propiedad.findByPk(idPropiedad);
    if (!propiedad) {
      return res.status(404).send({
        success: false,
        message: "Propiedad no encontrada",
      });
    }
    console.log(fotos);
    const fotosSubidas = [];
    for (let foto of fotos) {
      const uploadedFoto = await ImagenesPropiedad.create({
        idPropiedad: propiedad.idPropiedad,
        urlImagen: baseURL + foto.filename,
        esPrincipal: false,
        fechaSubida: Date.now(),
      });

      fotosSubidas.push(uploadedFoto);
    }

    return res.status(200).send({
      success: true,
      message: "Fotos subidas",
      fotos: fotosSubidas,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al subir fotos",
      error: e.message,
    });
  }
};
