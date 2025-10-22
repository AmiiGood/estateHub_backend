import { Router } from "express";
import {
    registrarCita,
    updateCita,
    obtenerCitas,
    obtenerCitaPorId,
    eliminarCita,
    obtenerCitasPorUsuario,
    obtenerCitasPorResponsable,
    actualizarEstatusCita,
} from "../Controllers/citasController.js";

const citasRouter = Router();

citasRouter.get("/getCitas", obtenerCitas);
citasRouter.get("/getCita/:idCita", obtenerCitaPorId);
citasRouter.get("/getCitasByUsuario/:idUsuario", obtenerCitasPorUsuario);
citasRouter.get("/getCitasByResponsable/:idResponsable", obtenerCitasPorResponsable);
citasRouter.post("/postCita", registrarCita);
citasRouter.put("/putCita", updateCita);
citasRouter.put("/putEstatusCita/:idCita", actualizarEstatusCita);
citasRouter.delete("/deleteCita/:idCita", eliminarCita);

export default citasRouter;