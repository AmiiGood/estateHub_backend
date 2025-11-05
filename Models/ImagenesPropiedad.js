import { DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const ImagenesPropiedad = databaseConnection.define(
  "imagenesPropiedad",
  {
    idImagen: {
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
    urlImagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fechaSubida: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "imagenesPropiedad",
    timestamps: true,
    createdAt: "fechaSubida",
    updatedAt: false,
    freezeTableName: true,
    paranoid: true,
  }
);
