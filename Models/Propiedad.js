const { Sequelize, DataTypes } = require("sequelize");

export const Propiedad = Sequelize.define("propiedad", {
  idPropiedad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  IdUsuario: {
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
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud: {
    type: DataTypes.FLOAT,
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

  codigo_postal: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  tipo_propiedad: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  estatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio_venta: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },

  precio_renta: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },

  num_habitaciones: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  num_banios: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  metros_cuadrados: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  publicado_ecommerce: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
