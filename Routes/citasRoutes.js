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
  actualizarEstatusCita,
  obtenerHorariosDisponibles,
} from "../Controllers/citasController.js";
import { verificarToken } from "../Middlewares/auth.js";

const citasRouter = Router();

citasRouter.get("/getCitas", verificarToken, obtenerCitas);
citasRouter.get("/getCita/:idCita", verificarToken, obtenerCitaPorId);
citasRouter.get(
  "/getCitasByUsuario/:idUsuario",
  verificarToken,
  obtenerCitasPorUsuario
);
citasRouter.get(
  "/getCitasByResponsable/:idUsuario",
  verificarToken,
  obtenerCitasPorResponsable
);
citasRouter.get(
  "/getCitasByPropiedad/:idPropiedad",
  verificarToken,
  obtenerCitasPorPropiedad
);
citasRouter.get(
  "/getCitasByEstatus/:estatus",
  verificarToken,
  obtenerCitasPorEstatus
);
citasRouter.get(
  "/getCitasByFechas",
  verificarToken,
  obtenerCitasPorRangoFechas
);
citasRouter.post("/postCita", verificarToken, crearCita);
citasRouter.put("/putCita", verificarToken, actualizarCita);
citasRouter.get("/getHorariosDisponibles", obtenerHorariosDisponibles);
citasRouter.delete("/deleteCita/:idCita", verificarToken, eliminarCita);
citasRouter.patch(
  "/patchCita/:idCita/estatus",
  verificarToken,
  actualizarEstatusCita
);

export default citasRouter;
