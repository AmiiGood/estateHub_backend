import { Router } from "express";
import { registrarPropiedad } from "../Controllers/propiedadesController.js";

const propiedadesRouter = Router();

propiedadesRouter.post("/postPropiedad", registrarPropiedad);

export default propiedadesRouter;
