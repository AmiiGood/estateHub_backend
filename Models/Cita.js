import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Cita = databaseConnection.define(
  "citas",
  {
    idCita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    idPropiedad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
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

    idResponsable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "idUsuario",
      },
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    estatus: {
      type: DataTypes.ENUM("en_proceso", "cancelada", "completada"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "fechaCreacion",
    updatedAt: false,
    freezeTableName: true,
    paranoid: true,
  }
);
