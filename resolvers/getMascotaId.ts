import express, {Request, Response} from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts"

const getMascotaId = async(id:string) => {
    if(!id){
        throw new Error("Faltan datos");
    }

    const mascota = MascotaModel.findById(id).exec();

    if(!mascota){ //mandamos un error 404 si no se ha encontrado la mascota
        Response.status(404).json({error:"No se ha encontrado la mascota"});
        return;
    }

    return mascota;
}

export default getMascotaId;