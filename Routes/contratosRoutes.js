import { Router } from "express";
import { contratoController } from "../Controllers/contratosController.js";

const router = Router();

// Rutas CRUD
router.get("/", contratoController.obtenerTodos);
router.get("/activos", contratoController.obtenerActivos);
router.get("/:id", contratoController.obtenerPorId);
router.post("/", contratoController.crear);
router.put("/:id", contratoController.actualizar);
router.delete("/:id", contratoController.eliminar);

// Rutas extra
router.get(
  "/usuario/:idUsuario",
  contratoController.obtenerPorUsuario
);
router.get(
  "/propiedad/:idPropiedad",
  contratoController.obtenerPorPropiedad
);
router.patch("/:id/estatus", contratoController.actualizarEstatus);

export default router;
