import express from "express";
import cors from "cors";
import pool from "../Config/connection.js";
import start_router from "../Routes/startRoutes.js";
import geocodificadorRoutes from "../Routes/geocodificadorRoutes.js";
import propiedadesRouter from "../Routes/propiedadesRoutes.js";
import usuariosRouter from "../Routes/usuariosRoutes.js";
import { Sequelize } from "sequelize";
import databaseConnection from "../Config/connection.js";
import "../Models/Asociaciones.js";
import { Usuario } from "./Usuario.js";
import { Propiedad } from "./Propiedad.js";
import { Contrato } from "../Models/Asociaciones.js";
import { Cita } from "./Cita.js";
import { GastosMantenimiento } from "./GastosMantenimiento.js";
import { PagoRenta } from "./Pago_renta.js";
import gastosMantenimientoRouter from "../Routes/GastosMantenimientoRoutes.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
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
      await databaseConnection.authenticate();
      await Usuario.sync();
      await Propiedad.sync();
      await Contrato.sync();
      await PagoRenta.sync();
      await GastosMantenimiento.sync();
      await Cita.sync();
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
    this.app.use("/api/gastosMantenimiento", gastosMantenimientoRouter);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
