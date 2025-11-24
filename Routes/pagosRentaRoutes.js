import { Router } from "express";
import {
    registrarPagoRenta,
    updatePagoRenta,
    obtenerPagosRenta,
    obtenerPagoRentaPorId,
    eliminarPagoRenta,
    obtenerPagosRentaPorContrato,
    obtenerPagosRentaPorEstatus,
    obtenerPagosRentaPorRangoFechas,
    actualizarEstatusPagoRenta,
} from "../Controllers/pagosRentaController.js";
import { verificarToken } from "../Middlewares/auth.js";

const pagosRentaRouter = Router();

pagosRentaRouter.get("/getPagosRenta",verificarToken, obtenerPagosRenta);
pagosRentaRouter.get("/getPagoRenta/:idPago",verificarToken, obtenerPagoRentaPorId);
pagosRentaRouter.get("/getPagosRentaByContrato/:idContrato",verificarToken, obtenerPagosRentaPorContrato);
pagosRentaRouter.get("/getPagosRentaByEstatus/:estatus",verificarToken, obtenerPagosRentaPorEstatus);
pagosRentaRouter.get("/getPagosRentaByRangoFechas",verificarToken, obtenerPagosRentaPorRangoFechas);
pagosRentaRouter.post("/postPagoRenta",verificarToken, registrarPagoRenta);
pagosRentaRouter.put("/putPagoRenta",verificarToken, updatePagoRenta);
pagosRentaRouter.delete("/deletePagoRenta/:idPago",verificarToken, eliminarPagoRenta);
pagosRentaRouter.patch("/patchPagoRenta/:idPago/estatus",verificarToken, actualizarEstatusPagoRenta);

export default pagosRentaRouter;