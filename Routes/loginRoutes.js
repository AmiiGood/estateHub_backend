import { Router } from "express";
import { login } from "../Controllers/loginController.js";

const usuariosRouter = Router();


usuariosRouter.post("/",login);

export default usuariosRouter;