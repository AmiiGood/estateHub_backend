import { Sequelize, DataTypes, DATE } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const PagoRenta = databaseConnection.define("pagos_renta", {
  id_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },

  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  estatus: {
    type: DataTypes.ENUM("pago_pendiente", "pago_recibido", "en_proceso"),
    allowNull: false,
  },

  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  referencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  notas: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
