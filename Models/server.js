import express from "express";
import cors from "cors";
import pool from "../Config/connection.js";
import start_router from "../Routes/startRoutes.js";
import geocodificadorRoutes from "../Routes/geocodificadorRoutes.js";
import propiedadesRouter from "../Routes/propiedadesRoutes.js";
import usuariosRouter from "../Routes/usuariosRoutes.js";
import citasRouter from "../Routes/citasRoutes.js";
import contratosRouter from "../Routes/contratosRoutes.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = 5050;
    this.connection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connection() {
    try {
      await pool;
      console.log("Conectado");
    } catch (e) {
      console.log(e);
    }
  }

  routes() {
    this.app.use("/api/start", start_router);
    this.app.use("/api/geocodificador", geocodificadorRoutes);
    this.app.use("/api/propiedades", propiedadesRouter);
    this.app.use("/api/usuarios", usuariosRouter);
    this.app.use("/api/citas", citasRouter);
    this.app.use("/api/contratos", contratosRouter);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
