import MascotaModel from "../db/mascota.ts"

const getMascotaId = async(id:string) => {
    if(!id){
        throw new Error("Faltan datos");
    }

    const mascota = await MascotaModel.findById(id).exec();

    if(!mascota){ //mandamos un error 404 si no se ha encontrado la mascota
        throw new Error("No se ha encontrado la mascota");
    }

    return mascota;
}

export default getMascotaId;