import { Contrato } from "./Contrato";
import { Propiedad } from "./Propiedad";

Propiedad.hasMany(Contrato, {
    foreignKey: "idPropiedad",
    as: "contrato"
})

Contrato.belongsTo(Propiedad, {
    foreignKey: "idPropiedad",
    as: "propiedad"
})

