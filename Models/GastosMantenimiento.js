import databaseConnection from "../Config/connection.js";

import { Sequelize, DataTypes } from "sequelize";

export const GastosMantenimiento = databaseConnection.define(
  "gastos_mantenimiento",
  {
    idGasto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idPropiedad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concepto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    fechaGasto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    proveedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "fechaGasto",
    updatedAt: false,
    freezeTableName: true,
  }
);
