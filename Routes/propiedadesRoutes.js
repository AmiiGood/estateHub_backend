import { Router } from "express";
import {
  eliminarPropiedad,
  obtenerPropiedad,
  obtenerPropiedades,
  publicarEcommerce,
  registrarPropiedad,
  updatePropiedad,
} from "../Controllers/propiedadesController.js";

const propiedadesRouter = Router();

propiedadesRouter.get("/getPropiedades", obtenerPropiedades);
propiedadesRouter.get("/getPropiedad/:idPropiedad", obtenerPropiedad);
propiedadesRouter.post("/postPropiedad", registrarPropiedad);
propiedadesRouter.put("/putPropiedad", updatePropiedad);
propiedadesRouter.delete("/deletePropiedad/:idPropiedad", eliminarPropiedad);
propiedadesRouter.put("/postEcommerce/:idPropiedad", publicarEcommerce);

export default propiedadesRouter;
