import { Router } from "express";
import {
  registrarContrato,
  updateContrato,
  obtenerContratoPorId,
  eliminarContrato,
  obtenerContratosPorUsuario,
  obtenerContratosPorPropiedad,
  obtenerContratosActivos,
  actualizarEstatusContrato,
} from "../Controllers/contratosController.js";
import { verificarToken } from "../Middlewares/auth.js";

const contratosRouter = Router();

contratosRouter.get("/getContratosActivos", verificarToken, obtenerContratosActivos);
contratosRouter.get("/getContrato/:idContrato", verificarToken, obtenerContratoPorId);
contratosRouter.get(
  "/getContratosByUsuario/:idUsuario",
  verificarToken,
  obtenerContratosPorUsuario
);
contratosRouter.get(
  "/getContratosByPropiedad/:idPropiedad",
  verificarToken,
  obtenerContratosPorPropiedad
);
contratosRouter.post("/postContrato",verificarToken, registrarContrato);
contratosRouter.put("/putContrato",verificarToken, updateContrato);
contratosRouter.put(
  "/putEstatusContrato/:idContrato",
  verificarToken,
  actualizarEstatusContrato
);
contratosRouter.delete("/deleteContrato/:idContrato",
  verificarToken,
  eliminarContrato);

export default contratosRouter;
