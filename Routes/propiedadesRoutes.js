import { Router } from "express";
import multer from "multer";
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
} from "../Controllers/propiedadesController.js";
import { verificarToken } from "../Middlewares/auth.js";

const propiedadesRouter = Router();

propiedadesRouter.get("/getPropiedades", obtenerPropiedades);
propiedadesRouter.get("/getPropiedad/:idPropiedad", obtenerPropiedad);
propiedadesRouter.post("/postPropiedad", registrarPropiedad);
propiedadesRouter.put("/putPropiedad", updatePropiedad);
propiedadesRouter.delete("/deletePropiedad/:idPropiedad", eliminarPropiedad);
propiedadesRouter.put("/postEcommerce/:idPropiedad", publicarEcommerce);
propiedadesRouter.post(
  "/subirFotos/:idPropiedad",
  upload.array("fotos", 10),
  subirFotos
);
propiedadesRouter.post("/postPropiedad", verificarToken, registrarPropiedad);
propiedadesRouter.put("/putPropiedad", verificarToken, updatePropiedad);
propiedadesRouter.delete("/deletePropiedad/:idPropiedad",verificarToken, eliminarPropiedad);
propiedadesRouter.put("/postEcommerce/:idPropiedad",verificarToken, publicarEcommerce);
propiedadesRouter.get("/getPropiedadesByUsuario/:idUsuario",verificarToken, obtenerPropiedadesPorUsuario)

export default propiedadesRouter;
