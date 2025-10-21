import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Notificacion = databaseConnection.define("notificaciones", {
  idNotificacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "idUsuario"
    }
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

  fechaEnvio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
  tableName: 'notificaciones',
  timestamps: true,
  createdAt: "fechaRegistro",
  updatedAt: false,
  freezeTableName: true,
  paranoid: true
});
