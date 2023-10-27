import MascotaModel from "../db/mascota.ts"

const updateMascota = async(id:string, nombre:string, descripcion:string, tipo:string) => {
    if(!id){
        throw new Error("Id vacio");
    }

    const siExiste = await MascotaModel.findById(id).exec();

    if(!siExiste){ //Si no se encuentra la mascota, mandamos un error 404
        throw new Error("No se ha encontrado a la mascota"); 
    }

    if(!nombre || !descripcion || !tipo){
        throw new Error("Faltan datos");
    }
    
    if(tipo !== "perro" && tipo !== "gato" && tipo != "serpiente"){ //Si el tipo a actualizar es incorrecto, mandamos un error 400
        throw new Error("No se puede actualizar a un tipo incorrecto");
    }

    const mascotaUpdated = await MascotaModel.findByIdAndUpdate({id}, {nombre, descripcion, tipo}).exec();
    return mascotaUpdated;
}

export default updateMascota;