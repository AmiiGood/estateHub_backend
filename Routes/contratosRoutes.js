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

const contratosRouter = Router();

contratosRouter.get("/getContratosActivos", obtenerContratosActivos);
contratosRouter.get("/getContrato/:idContrato", obtenerContratoPorId);
contratosRouter.get(
  "/getContratosByUsuario/:idUsuario",
  obtenerContratosPorUsuario
);
contratosRouter.get(
  "/getContratosByPropiedad/:idPropiedad",
  obtenerContratosPorPropiedad
);
contratosRouter.post("/postContrato", registrarContrato); //check
contratosRouter.put("/putContrato", updateContrato);
contratosRouter.put(
  "/putEstatusContrato/:idContrato",
  actualizarEstatusContrato
);
contratosRouter.delete("/deleteContrato/:idContrato", eliminarContrato);

export default contratosRouter;
