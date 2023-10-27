import MascotaModel from "../db/mascota.ts"

const getMascota = async() => {
    const mascotas = await MascotaModel.find({}).exec(); //Esperamos a coger todas las mascotas de la base de datos
    return mascotas;
}

export default getMascota;