import { Contrato } from "./Contrato.js";
import { GastosMantenimiento } from "./GastosMantenimiento.js";
import { Propiedad } from "./Propiedad.js";
import { Usuario } from "./Usuario.js";
import { Cita } from "./Cita.js";
import { PagoRenta } from "./PagoRenta.js";

Propiedad.hasMany(Contrato, {
  foreignKey: "idPropiedad",
  as: "contratos",
});

Contrato.belongsTo(Propiedad, {
  foreignKey: "idPropiedad",
  as: "propiedad",
});

Usuario.hasMany(Contrato, {
  foreignKey: "idUsuario",
  as: "contratos",
});

Contrato.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuarios",
});

Usuario.hasMany(Propiedad, {
  foreignKey: "idUsuario",
  as: "propiedades",
});

Propiedad.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuarios",
});

Propiedad.hasMany(GastosMantenimiento, {
  foreignKey: "idPropiedad",
  as: "gastos_mantenimiento",
});

GastosMantenimiento.belongsTo(Propiedad, {
  foreignKey: "idPropiedad",
  as: "propiedad",
});

Propiedad.hasMany(Cita, {
  foreignKey: "idPropiedad",
  as: "citas",
});

Cita.belongsTo(Propiedad, {
  foreignKey: "idPropiedad",
  as: "propiedad",
});

Cita.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuario",
});

Cita.belongsTo(Usuario, {
  foreignKey: "idResponsable",
  as: "responsable",
});

Usuario.hasMany(Cita, {
  foreignKey: "idUsuario",
  as: "citasAgendadas",
});

Usuario.hasMany(Cita, {
  foreignKey: "idResponsable",
  as: "citasAsignadas",
});

PagoRenta.belongsTo(Contrato, {
  foreignKey: "idContrato",
  as: "contrato",
});

Contrato.hasMany(PagoRenta, {
  foreignKey: "idContrato",
  as: "pagos",
});

export { Contrato, Propiedad, Usuario, Cita, PagoRenta };
