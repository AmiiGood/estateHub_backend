import { Router } from "express";
import { citaController } from "../Controllers/citasController.js";

const router = Router();

// Rutas CRUD
router.get("/", citaController.obtenerTodas);
router.get("/:id", citaController.obtenerPorId);
router.post("/", citaController.crear);
router.put("/:id", citaController.actualizar);
router.delete("/:id", citaController.eliminar);

// Rutas extra
router.get("/usuario/:idUsuario", citaController.obtenerPorUsuario);
router.get("/responsable/:idResponsable", citaController.obtenerPorResponsable);
router.patch("/:id/estatus", citaController.actualizarEstatus);

export default router;
