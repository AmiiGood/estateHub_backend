import { Router } from "express";
import {
  deleteGastoMantenimiento,
  getGastoMantenimiento,
  getGastosMantenimiento,
  postGastosMantenimiento,
  putGastosMantenimiento,
} from "../Controllers/gatosMantenimientoController.js";
import { verificarToken } from "../Middlewares/auth.js";

const gastosMantenimientoRouter = Router();

gastosMantenimientoRouter.post(
  "/postGastosMantenimiento",
  verificarToken,
  postGastosMantenimiento
);
gastosMantenimientoRouter.put(
  "/putGastosMantenimiento",
  verificarToken,
  putGastosMantenimiento
);
gastosMantenimientoRouter.get(
  "/getGastosMantenimiento",
  verificarToken,
  getGastosMantenimiento
);
gastosMantenimientoRouter.get(
  "/getGastoMantenimiento/:idGasto",
  verificarToken,
  getGastoMantenimiento
);

gastosMantenimientoRouter.delete(
  "/deleteGastoMantenimiento/:idGasto",
  verificarToken,
  deleteGastoMantenimiento
);

export default gastosMantenimientoRouter;
