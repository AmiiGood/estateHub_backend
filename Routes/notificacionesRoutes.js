import { Router } from "express";

import { agregarNotificacion } from "../Controllers/notificacionesController.js";
import { editarNotificacion } from "../Controllers/notificacionesController.js";
import { getAllNotificaciones } from "../Controllers/notificacionesController.js";
import { getNotificacion } from "../Controllers/notificacionesController.js";
import { eliminarNotificacion } from "../Controllers/notificacionesController.js";

const notificacionesRouter = Router();

notificacionesRouter.post("/postNotificacion", agregarNotificacion);

notificacionesRouter.put("/putNotificacion/:idNotificacion", editarNotificacion);

notificacionesRouter.get("/getAllNotificaciones", getAllNotificaciones);

notificacionesRouter.get("/getNotificacion/:idNotificacion", getNotificacion);

notificacionesRouter.delete("/deleteNotificacion/:idNotificacion", eliminarNotificacion);

export default notificacionesRouter;