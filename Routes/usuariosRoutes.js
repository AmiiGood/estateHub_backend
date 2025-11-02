import { Router } from "express";
import { editarUsuario, eliminarUsuario, getAllUsuarios, getUsuario, registrarUsuario } from "../Controllers/usuariosController.js";
import { verificarToken } from "../Middlewares/auth.js";

const usuariosRouter = Router();


usuariosRouter.get("/getAllUsuarios",verificarToken, getAllUsuarios);
usuariosRouter.get("/getUsuario/:idUsuario", verificarToken, getUsuario);
usuariosRouter.post("/postUsuario", registrarUsuario);
usuariosRouter.put("/putUsuario",verificarToken, editarUsuario);
usuariosRouter.delete("/deleteUsuario/:idUsuario",verificarToken, eliminarUsuario);
export default usuariosRouter;
