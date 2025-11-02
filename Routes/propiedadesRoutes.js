import { Router } from "express";
import {
  eliminarPropiedad,
  obtenerPropiedad,
  obtenerPropiedades,
  publicarEcommerce,
  registrarPropiedad,
  updatePropiedad,
} from "../Controllers/propiedadesController.js";
import { verificarToken } from "../Middlewares/auth.js";

const propiedadesRouter = Router();

propiedadesRouter.get("/getPropiedades", obtenerPropiedades);
propiedadesRouter.get("/getPropiedad/:idPropiedad", obtenerPropiedad);
propiedadesRouter.post("/postPropiedad", verificarToken, registrarPropiedad);
propiedadesRouter.put("/putPropiedad", verificarToken, updatePropiedad);
propiedadesRouter.delete("/deletePropiedad/:idPropiedad",verificarToken, eliminarPropiedad);
propiedadesRouter.put("/postEcommerce/:idPropiedad",verificarToken, publicarEcommerce);

export default propiedadesRouter;
