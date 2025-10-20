import { Contrato } from "./Contrato";
import { GastosMantenimiento } from "./GastosMantenimiento";
import { Propiedad } from "./Propiedad";
import { Usuario } from "./Usuario";

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
  as: "usuario",
});

Usuario.hasMany(Propiedad, {
  foreignKey: "idUsuario",
  as: "propiedades",
});

Propiedad.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuario",
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
