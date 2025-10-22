import { Router } from "express";
import {
  registrarContrato,
  updateContrato,
  obtenerContratos,
  obtenerContratoPorId,
  eliminarContrato,
  obtenerContratosPorUsuario,
  obtenerContratosPorPropiedad,
  obtenerContratosActivos,
  actualizarEstatusContrato,
} from "../Controllers/contratosController.js";

const contratosRouter = Router();

contratosRouter.get("/getContratos", obtenerContratos);
contratosRouter.get("/getContratosActivos", obtenerContratosActivos);
contratosRouter.get("/getContrato/:idContrato", obtenerContratoPorId);
contratosRouter.get("/getContratosByUsuario/:idUsuario", obtenerContratosPorUsuario);
contratosRouter.get("/getContratosByPropiedad/:idPropiedad", obtenerContratosPorPropiedad);
contratosRouter.post("/postContrato", registrarContrato);
contratosRouter.put("/putContrato", updateContrato);
contratosRouter.put("/putEstatusContrato/:idContrato", actualizarEstatusContrato);
contratosRouter.delete("/deleteContrato/:idContrato", eliminarContrato);

export default contratosRouter;