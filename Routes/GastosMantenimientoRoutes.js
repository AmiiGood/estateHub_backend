import { Router } from "express";
import {
  deleteGastoMantenimiento,
  getGastoMantenimiento,
  getGastosMantenimiento,
  postGastosMantenimiento,
  putGastosMantenimiento,
} from "../Controllers/gatosMantenimientoController.js";

const gastosMantenimientoRouter = Router();

gastosMantenimientoRouter.post(
  "/postGastosMantenimiento",
  postGastosMantenimiento
);
gastosMantenimientoRouter.put(
  "/putGastosMantenimiento",
  putGastosMantenimiento
);
gastosMantenimientoRouter.get(
  "/getGastosMantenimiento",
  getGastosMantenimiento
);
gastosMantenimientoRouter.get(
  "/getGastoMantenimiento/:idGasto",
  getGastoMantenimiento
);

gastosMantenimientoRouter.delete(
  "/deleteGastoMantenimiento/:idGasto",
  deleteGastoMantenimiento
);

export default gastosMantenimientoRouter;
