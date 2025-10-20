import { Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../Config/connection";

export const PagoRenta = databaseConnection.define("pagosRenta", {
    idPago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    idContrato: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "contratos",
            key: "idContrato"
        }
    },

    monto: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },

    fechaPago: {
        type: DataTypes.DATE,
        allowNull: false
    },

    estatus: {
        type: DataTypes.ENUM('pago_pendiente', 'pago_recibido', 'en_proceso'),
        allowNull: false
    },

    metodoPago: {
        type: DataTypes.STRING,
        allowNull: false
    },

    referencia: {
        type: DataTypes.STRING,
        allowNull: false
    },

    notas: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
    {
        timestamps: true,
        createdAt: "fechaRegistro",
        updatedAt: false,
        freezeTableName: true,
        paranoid: true
    }
)