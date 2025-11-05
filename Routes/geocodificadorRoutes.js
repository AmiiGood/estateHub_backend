import { Router } from "express";
import { buscadorInfo } from "../Controllers/geocodificadorController.js";


const geocodificadorRouter = Router();

geocodificadorRouter.get("getInfo", buscadorInfo);

export default geocodificadorRouter;
