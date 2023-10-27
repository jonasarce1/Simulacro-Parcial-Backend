import MascotaModel from "../db/mascota.ts"

const addMascota = async(nombre:string, descripcion:string, tipo:string) => {
    if(!nombre || !descripcion || !tipo){
        throw new Error("Faltan datos");
    }

    if(tipo !== "perro" && tipo !== "gato" && tipo != "serpiente"){ //Si el tipo es incorrecto, mandamos un error 400
        throw new Error("Tipo incorrecto");
    }

    const yaExiste = await MascotaModel.findOne({nombre, descripcion, tipo}).exec();

    if(yaExiste){
        throw new Error("Ya existe esta mascota");
    }

    const nuevaMascota = await new MascotaModel({nombre, descripcion, tipo});
    await nuevaMascota.save();
    return nuevaMascota
}

export default addMascota;