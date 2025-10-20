import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Notificacion = databaseConnection.define("notificaciones", {
  id_notificacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  tipo: {
    type: DataTypes.ENUM('pago_pendiente','pago_recibido','en_proceso'),
    allowNull: false,
  },

  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  leida: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  fecha_envio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
  tableName: 'notificaciones',
  timestamps: false
});
