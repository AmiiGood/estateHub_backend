

export const saludar = async(req, res) => {

    console.log("pase por aqui")

    return res.status(200).send({
        saludo: "Hola api"
    });

}


export default {saludar}

