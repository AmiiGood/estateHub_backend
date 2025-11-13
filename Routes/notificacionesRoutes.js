import { Router } from "express";

import { agregarNotificacion } from "../Controllers/notificacionesController.js";
import { editarNotificacion } from "../Controllers/notificacionesController.js";
import { getAllNotificaciones } from "../Controllers/notificacionesController.js";
import { getNotificacion } from "../Controllers/notificacionesController.js";
import { eliminarNotificacion } from "../Controllers/notificacionesController.js";
import { verificarToken } from "../Middlewares/auth.js";

const notificacionesRouter = Router();

notificacionesRouter.post("/postNotificacion",verificarToken, agregarNotificacion);

notificacionesRouter.put("/putNotificacion/:idNotificacion",verificarToken, editarNotificacion);

notificacionesRouter.get("/getAllNotificaciones",verificarToken, getAllNotificaciones);

notificacionesRouter.get("/getNotificacion/:idNotificacion",verificarToken, getNotificacion);

notificacionesRouter.delete("/deleteNotificacion/:idNotificacion",verificarToken, eliminarNotificacion);

export default notificacionesRouter;