import { Contrato } from "./Contrato.js";
import { GastosMantenimiento } from "./GastosMantenimiento.js";
import { Propiedad } from "./Propiedad.js";
import { Usuario } from "./Usuario.js";

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

export { Contrato, Propiedad, Usuario };
