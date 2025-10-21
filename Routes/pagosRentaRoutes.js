import { Router } from "express";
import { pagosRentaController } from "../Controllers/pagosRentaController.js";

const router = Router();

// Rutas CRUD
router.get("/", pagosRentaController.obtenerTodos);
router.get("/:id", pagosRentaController.obtenerPorId);
router.post("/", pagosRentaController.crear);
router.put("/:id", pagosRentaController.actualizar);
router.delete("/:id", pagosRentaController.eliminar);

// Rutas extra
router.get("/contrato/:idContrato", pagosRentaController.obtenerPorContrato);
router.get("/estatus/:estatus", pagosRentaController.obtenerPorEstatus);
router.get("/filtro/fechas", pagosRentaController.obtenerPorRangoFechas);

export default router;
