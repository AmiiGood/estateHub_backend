import { Sequelize, DataTypes, DATE } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Cita = databaseConnection.define("cita", {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  id_propiedad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  id_responsable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  estatus: {
    type: DataTypes.ENUM("en_proceso", "cancelada", "completada"),
    allowNull: false,
  },

  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
