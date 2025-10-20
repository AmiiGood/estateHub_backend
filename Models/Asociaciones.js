import { Contrato } from "./Contrato";
import { Propiedad } from "./Propiedad";
import { Usuario } from "./Usuario";
import { Cita } from "./Cita";
import { PagoRenta } from "./Pago_renta";

Propiedad.hasMany(Contrato, {
    foreignKey: "idPropiedad",
    as: "contratos"
})

Contrato.belongsTo(Propiedad, {
    foreignKey: "idPropiedad",
    as: "propiedad"
})

Usuario.hasMany(Contrato, {
    foreignKey: "idUsuario",
    as: "contratos"
})

Contrato.belongsTo(Usuario, {
    foreignKey: "idUsuario",
    as: "usuario"
})

Propiedad.hasMany(Cita, {
    foreignKey: "idPropiedad",
    as: "citas"
})

Cita.belongsTo(Propiedad, {
    foreignKey: "idPropiedad",
    as: "propiedad"
})

Cita.belongsTo(Usuario, {
    foreignKey: "idUsuario",
    as: "usuario"
})

Cita.belongsTo(Usuario, {
    foreignKey: "idResponsable",
    as: "responsable"
})

Usuario.hasMany(Cita, {
    foreignKey: "idUsuario",
    as: "citasAgendadas"
})

Usuario.hasMany(Cita, {
    foreignKey: "idResponsable",
    as: "citasAsignadas"
})

PagoRenta.belongsTo(Contrato, {
    foreignKey: "idContrato",
    as: "contrato"
})

Contrato.hasMany(PagoRenta, {
    foreignKey: "idContrato",
    as: "pagos"
})


export { Contrato, Propiedad, Usuario, Cita, PagoRenta }