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
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
    this.connection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connection() {
    try {
      await databaseConnection.authenticate();
      console.log("Conexión Sequelize establecida");

      await Usuario.sync();
      await Propiedad.sync();
      await Contrato.sync();
      await PagoRenta.sync();
      await GastosMantenimiento.sync();
      await Cita.sync();
      await Notificacion.sync();
      await ImagenesPropiedad.sync();
      console.log("Modelos sincronizados");

      await pool.query("SELECT NOW()");
      console.log("Pool de PostgreSQL conectado");
    } catch (e) {
      console.error("✗ Error en conexión:", e.message);
      throw e;
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

    // Ruta de health check
    this.app.get("/health", (req, res) => {
      res.json({ status: "ok", timestamp: new Date() });
    });
  }

  async startServer() {
    try {
      // Esperar a que la conexión esté lista
      await this.connection();

      this.app.listen(this.port, "0.0.0.0", () => {
        console.log(`
╔════════════════════════════════════════╗
║  🚀 Servidor corriendo exitosamente   ║
║  📡 Puerto: ${this.port}                      ║
║  🌐 Host: 0.0.0.0                      ║
║  📅 ${new Date().toLocaleString()}     ║
╚════════════════════════════════════════╝
        `);
      });
    } catch (error) {
      console.error("✗ Error al iniciar servidor:", error);
      process.exit(1);
    }
  }
}
