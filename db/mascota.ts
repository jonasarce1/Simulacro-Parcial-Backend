import mongoose from "npm:mongoose@7.6.3"; 
//import {Mascota} from "../types.ts";

const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    nombre:{type:String, required:true}, //Todos los datos son olbigatorios
    descripcion:{type:String, required:true}, 
    tipo:{type:String, required: true}
})

//type MascotaModelType = mongoose.Document & Omit<Mascota, "id">

//export default mongoose.model<MascotaModelType>("Mascota", mascotaSchema) //otra manera

export default mongoose.model("Mascota", mascotaSchema); //Exportacion el modelo