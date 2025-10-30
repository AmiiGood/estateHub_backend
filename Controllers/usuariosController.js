import e from "cors";
import { Usuario } from "../Models/Usuario.js";
import bcrypt from "bcrypt";

export const getAllUsuarios = async (req, res) => {
  try {
    
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["passwordHash"] },
    });
    if (usuarios.length === 0) {
      return res.status(204).json({
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: usuarios,
      count: usuarios.length,
    });
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
};

export const getUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(404).send({
      message: "Usuario no encontrado",
    });
  }

  const user = await Usuario.findByPk(idUsuario,
    {attributes: { exclude: ["passwordHash"] },
  });

  try {
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
};

export const registrarUsuario = async (req, res) => {
  const { usuario } = req.body;
  console.log(" Body recibido:", req.body);

  if (!usuario || !usuario.email?.trim() || !usuario.password?.trim() || !usuario.nombre?.trim() || !usuario.apellidoPaterno?.trim() || !usuario.apellidoMaterno?.trim()) {
  return res.status(400).json({
    success: false,
    message: "Campos requeridos faltantes o vacíos.",
  });
}


  const existe = await Usuario.findOne({ where: { email: usuario.email } });
    if (existe) {
      return res.status(409).json({
        success: false,
        message: "El correo ya está registrado.",
      });
    }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(usuario.password, saltRounds);
  try {
    console.log(usuario);
    const newUsuario = await Usuario.create({
      email: usuario.email,
      passwordHash: passwordHash,
      nombre: usuario.nombre,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      telefono: usuario.telefono,
      fechaRegistro: usuario.fechaRegistro,
      activo: true,
    });

    return res.status(200).send({
      message: "Usuario registrado exitosamente",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error al registrar el usuario",
    });
  }
};

export const editarUsuario = async (req, res) => {
  const { usuario } = req.body;
  const user = await Usuario.findByPk(usuario.idUsuario);
  if (!user) {
    return res.status(404).send({
      message: "Usuario no encontrado",
    });
  }

  let passwordHash = user.passwordHash;
  if (usuario.password && usuario.password.trim() !== "") {
    const saltRounds = 10;
    passwordHash = await bcrypt.hash(usuario.password, saltRounds);
  }

  try {
    await user.update({
      email: usuario.email,
      passwordHash: passwordHash,
      nombre: usuario.nombre,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      telefono: usuario.telefono,
    });
    return res.status(200).send({
      message: "Usuario editado exitosamente",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error al editar el usuario",
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    console.log("Params recibidos:", req.params);
    console.log("Body recibido:", req.body);

    const { idUsuario } = req.params;

    // Validar que idUsuario existe
    if (!idUsuario) {
      return res.status(400).send({
        message: "ID de usuario es requerido",
      });
    }

    console.log("Buscando usuario con ID:", idUsuario);

    const user = await Usuario.findByPk(idUsuario);

    if (!user) {
      return res.status(404).send({
        message: "Usuario no encontrado",
      });
    }

    await user.update({ activo: false });

    return res.status(200).send({
      message: "Usuario eliminado exitosamente",
    });
  } catch (e) {
    console.log("Error completo:", e);
    return res.status(500).send({
      message: "Error al eliminar el usuario",
      error: e.message,
    });
  }
};
