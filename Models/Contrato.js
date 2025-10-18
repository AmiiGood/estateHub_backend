import { Sequelize, DataTypes, DATE } from "sequelize";
import databaseConnection from "../Config/connection";

export const Contrato = databaseConnection.define("contrato", {
    id_contrato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_propiedad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    url_doc: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },

    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    },

    monto_mensual: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    deposito: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    estatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    fech_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    }
})