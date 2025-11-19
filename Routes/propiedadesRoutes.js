import { Router } from "express";
import upload from "../Helpers/configMulter.js";
import {
  eliminarPropiedad,
  obtenerPropiedad,
  obtenerPropiedades,
  obtenerPropiedadesPorUsuario,
  publicarEcommerce,
  registrarPropiedad,
  subirFotos,
  updatePropiedad,
  eliminarFoto,
} from "../Controllers/propiedadesController.js";
import { verificarToken } from "../Middlewares/auth.js";

const propiedadesRouter = Router();

propiedadesRouter.get("/getPropiedades", obtenerPropiedades);
propiedadesRouter.get("/getPropiedad/:idPropiedad", obtenerPropiedad);
propiedadesRouter.post("/postPropiedad", verificarToken, registrarPropiedad);
propiedadesRouter.put("/putPropiedad", verificarToken, updatePropiedad);
propiedadesRouter.delete(
  "/deletePropiedad/:idPropiedad",
  verificarToken,
  eliminarPropiedad
);
propiedadesRouter.put(
  "/postEcommerce/:idPropiedad",
  verificarToken,
  publicarEcommerce
);
propiedadesRouter.post(
  "/subirFotos/:idPropiedad",
  verificarToken,
  upload.array("fotos", 10),
  subirFotos
);
propiedadesRouter.delete(
  "/eliminarFoto/:idImagen",
  verificarToken,
  eliminarFoto
);

export default propiedadesRouter;