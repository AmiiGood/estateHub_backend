import { Router } from "express";
import { buscadorInfo } from "../Controllers/geocodificadorController.js";

const geocodificadorRouter = Router();

geocodificadorRouter.post("/getInfo", buscadorInfo);

export default geocodificadorRouter;
