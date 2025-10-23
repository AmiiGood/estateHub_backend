import { GastosMantenimiento } from "../Models/GastosMantenimiento.js";

export const postGastosMantenimiento = async (req, res) => {
  const { gastosMantenimiento } = req.body;

  try {
    const propiedad = await Propiedad.findByPk(gastosMantenimiento.idPropiedad);

    if (propiedad) {
      return res.status(404).send({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const gastosMantenimiento = await GastosMantenimiento.create({
      idPropiedad: gastosMantenimiento.idPropiedad,
      categoria: gastosMantenimiento.categoria,
      concepto: gastosMantenimiento.concepto,
      monto: gastosMantenimiento.monto,
      fechaGasto: gastosMantenimiento.fechaGasto,
      proovedor: gastosMantenimiento.proovedor,
      descripcion: gastosMantenimiento.descripcion,
      fechaRegistro: Date.now(),
    });

    return res.status(200).send({
      success: true,
      message: "Gastos de mantenimiento registrados",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al registrar gastos de mantenimiento",
      error: e.message,
    });
  }
};

export const putGastosMantenimiento = async (req, res) => {
  const { gastoMantenimiento } = req.body;
  try {
    const findGastosMantenimiento = await GastosMantenimiento.findByPk(
      gastoMantenimiento.idGasto
    );

    if (!findGastosMantenimiento) {
      return res.status(404).send({
        success: false,
        message: "Gasto de mantenimiento no encontrado",
      });
    }

    await findGastosMantenimiento.update({
      gastoMantenimiento,
    });

    return res.status(200).send({
      success: true,
      message: "Gasto de mantenimiento actualizado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al editar gastos de mantenimiento",
      error: e.message,
    });
  }
};

export const getGastosMantenimiento = async (req, res) => {
  try {
    const gastosMantenimiento = await GastosMantenimiento.findAll();

    if (!gastosMantenimiento) {
      return res.status(404).send({
        success: false,
        message: "No hay gastos de mantenimiento registrados",
      });
    }

    return res.status(200).json({
      success: true,
      data: gastosMantenimiento,
      count: gastosMantenimiento.length,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al obtener gastos de mantenimiento",
      error: e.message,
    });
  }
};

export const getGastoMantenimiento = async (req, res) => {
  const { idGasto } = req.params;
  try {
    const gastoMantenimiento = await GastosMantenimiento.findByPk(idGasto);

    if (!gastoMantenimiento) {
      return res.status(404).send({
        success: false,
        message: "Gasto de mantenimiento no encontrado",
      });
    }

    return res.status(200).send({
      success: true,
      data: gastoMantenimiento,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener gasto de mantenimiento",
    });
  }
};

export const deleteGastoMantenimiento = async (req, res) => {
  const { idGasto } = req.params;
  try {
    const deletedGasto = await GastosMantenimiento.findByPk(idGasto);

    if (!deletedGasto) {
      return res.status(404).send({
        success: false,
        message: "Gasto de mantenimiento no encontrado",
      });
    }

    await deletedGasto.destroy();

    return res.status(200).send({
      success: true,
      message: "Gasto de mantenimiento eliminado",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: "Error al eliminar gasto de mantenimiento",
      error: e.message,
    });
  }
};
