import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Usuario = databaseConnection.define(
  "usuarios",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_usuario",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.ENUM("arrendatario", "propiertario"),
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);
