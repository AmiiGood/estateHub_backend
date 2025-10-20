import { Router } from "express";
import { editarUsuario, eliminarUsuario, getAllUsuarios, getUsuario, registrarUsuario } from "../Controllers/usuariosController.js";

const usuariosRouter = Router();


usuariosRouter.get("/getAllUsuarios",getAllUsuarios);
usuariosRouter.get("/getUsuario/:idUsuario",getUsuario);
usuariosRouter.post("/postUsuario", registrarUsuario);
usuariosRouter.put("/putUsuario", editarUsuario);
usuariosRouter.delete("/deleteUsuario/:idUsuario", eliminarUsuario);
export default usuariosRouter;
