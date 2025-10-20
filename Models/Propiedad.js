import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection.js";

export const Propiedad = databaseConnection.define(
  "propiedad",
  {
    idPropiedad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    codigoPostal: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tipoPropiedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    estatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioVenta: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    precioRenta: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    numHabitaciones: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numBanios: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    metrosCuadrados: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    numEstacionamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plantas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    residencial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    jardin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    alberca: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sotano: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    terraza: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cuartoServicio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    muebles: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    credito: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    fechaRegistro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    publicadoEcommerce: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "fechaRegistro",
    updatedAt: false,
    freezeTableName: true,
    paranoid: true,
  }
);
