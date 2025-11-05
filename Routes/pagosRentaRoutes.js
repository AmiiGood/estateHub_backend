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

const pagosRentaRouter = Router();

pagosRentaRouter.get("/getPagosRenta", obtenerPagosRenta);
pagosRentaRouter.get("/getPagoRenta/:idPago", obtenerPagoRentaPorId);
pagosRentaRouter.get("/getPagosRentaByContrato/:idContrato", obtenerPagosRentaPorContrato);
pagosRentaRouter.get("/getPagosRentaByEstatus/:estatus", obtenerPagosRentaPorEstatus);
pagosRentaRouter.get("/getPagosRentaByRangoFechas", obtenerPagosRentaPorRangoFechas);
pagosRentaRouter.post("/postPagoRenta", registrarPagoRenta);
pagosRentaRouter.put("/putPagoRenta", updatePagoRenta);
pagosRentaRouter.delete("/deletePagoRenta/:idPago", eliminarPagoRenta);
pagosRentaRouter.patch("/patchPagoRenta/:idPago/estatus", actualizarEstatusPagoRenta);

export default pagosRentaRouter;