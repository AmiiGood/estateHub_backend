import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Contrato = databaseConnection.define(
  "contratos",
  {
    idContrato: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    idPropiedad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        //Nombre de la tabla
        model: "propiedades",
        key: "idPropiedad",
      },
    },

    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "idUsuario",
      },
    },

    urlDoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    fechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    montoMensual: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    deposito: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    estatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    //Esto crea automaticamente createdAt y updatedAt
    timestamps: true,
    createdAt: "fechaCreacion",
    updatedAt: false,
    //Forzar nombre con el que se declara
    freezeTableName: true,
    //Implementa eliminacion logica
    paranoid: true,
  }
);
