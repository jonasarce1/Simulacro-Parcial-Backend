import MascotaModel from "../db/mascota.ts"

const deleteMascota = async(id:string) => {
    if(!id){
        throw new Error("Faltan datos");
    }

    const mascotaBorrada = await MascotaModel.findByIdAndDelete(id).exec();

    if(!mascotaBorrada){
        throw new Error("No se ha encontrado la mascota");
    }
}

export default deleteMascota;