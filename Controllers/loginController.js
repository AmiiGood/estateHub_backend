import e from "cors";
import { Usuario } from "../Models/Usuario.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req, res) => {

  console.log("Params recibidos:", req.params);
    console.log("Body recibido:", req.body);
  try {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "correo y contraseña son requeridos",
    });
  }

  const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

  const passwordMatch = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        idUsuario: usuario.idUsuario,
        email: usuario.email,
        nombre: usuario.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Error iniciar sesión:", error);
    return res.status(500).json({
      success: false,
      message: "Error al iniciar la sesión",
    });
  }
};
