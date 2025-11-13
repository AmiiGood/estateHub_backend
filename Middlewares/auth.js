//Aqui van funciones que se ejecutan entre la peticion y el controlador
//Por ejemplo una funcion que valida que el token sea el correcto

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error("Error en la verificación de token:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
    