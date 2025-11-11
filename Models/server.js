import express from "express";
import cors from "cors";
import pool from "../Config/connection.js";
import start_router from "../Routes/startRoutes.js";
import geocodificadorRoutes from "../Routes/geocodificadorRoutes.js";
import propiedadesRouter from "../Routes/propiedadesRoutes.js";
import notificacionesRouter from "../Routes/notificacionesRoutes.js";
import usuariosRouter from "../Routes/usuariosRoutes.js";
import citasRouter from "../Routes/citasRoutes.js";
import contratosRouter from "../Routes/contratosRoutes.js";
import pagosRentaRouter from "../Routes/pagosRentaRoutes.js";
import { Sequelize } from "sequelize";
import databaseConnection from "../Config/connection.js";
import "../Models/Asociaciones.js";
import { Usuario } from "./Usuario.js";
import { Propiedad } from "./Propiedad.js";
import { Contrato } from "../Models/Asociaciones.js";
import { Cita } from "./Cita.js";
import { GastosMantenimiento } from "./GastosMantenimiento.js";
import { PagoRenta } from "./PagoRenta.js";
import { Notificacion } from "./Notificacion.js";
import gastosMantenimientoRouter from "../Routes/GastosMantenimientoRoutes.js";
import { ImagenesPropiedad } from "./ImagenesPropiedad.js";
import loginRouter from "../Routes/loginRoutes.js";

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
    //this.app.use("/uploads", express.static("uploads"));
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
      await Notificacion.sync();
      await ImagenesPropiedad.sync();
      console.log("Conectado");

      await pool;
      console.log("GeoConectado");
    } catch (e) {
      console.log(e);
    }
  }

  routes() {
    this.app.use("/api/start", start_router);
    this.app.use("/api/geocodificador", geocodificadorRoutes);
    this.app.use("/api/propiedades", propiedadesRouter);
    this.app.use("/api/notificaciones", notificacionesRouter);
    this.app.use("/api/usuarios", usuariosRouter);
    this.app.use("/api/citas", citasRouter);
    this.app.use("/api/contratos", contratosRouter);
    this.app.use("/api/pagosRenta", pagosRentaRouter);
    this.app.use("/api/gastosMantenimiento", gastosMantenimientoRouter);

    this.app.use("/api/login", loginRouter);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
