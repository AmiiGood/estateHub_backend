import { Router } from "express";
import {
  crearCita,
  actualizarCita,
  obtenerCitas,
  obtenerCitaPorId,
  eliminarCita,
  obtenerCitasPorUsuario,
  obtenerCitasPorResponsable,
  obtenerCitasPorEstatus,
  obtenerCitasPorRangoFechas,
  obtenerCitasPorPropiedad,
} from "../Controllers/citasController.js";

const citasRouter = Router();

citasRouter.get("/getCitas", obtenerCitas);
citasRouter.get("/getCita/:idCita", obtenerCitaPorId);
citasRouter.get("/getCitasByUsuario/:idUsuario", obtenerCitasPorUsuario);
citasRouter.get(
  "/getCitasByResponsable/:idUsuario",
  obtenerCitasPorResponsable
);
citasRouter.get("/getCitasByPropiedad/:idPropiedad", obtenerCitasPorPropiedad);
citasRouter.get("/getCitasByEstatus/:estatus", obtenerCitasPorEstatus);
citasRouter.get("/getCitasByFechas", obtenerCitasPorRangoFechas);
citasRouter.post("/postCita", crearCita);
citasRouter.put("/putCita", actualizarCita);
citasRouter.delete("/deleteCita/:idCita", eliminarCita);

export default citasRouter;
