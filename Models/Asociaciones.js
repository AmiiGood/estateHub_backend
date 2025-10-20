import { Contrato } from "./Contrato";
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

export { Contrato, Propiedad, Usuario };
