import express, {Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getMascota from "./resolvers/getMascota.ts";
import getMascotaId from "./resolvers/getMascotaId.ts";
import addMascota from "./resolvers/addMascota.ts";
import deleteMascota from "./resolvers/deleteMascota.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); //Obtenemos la variable de entorno MONGO_URL ya sea de .env o de las variables de entorno del sistema

if(!MONGO_URL){
  console.log("No se ha encontrado la variable de entorno MONGO_URL");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());

app.get("/api/mascotas", async(_req:Request, res:Response) => { //Get de todas las mascotas
  try{
    const mascotas = await getMascota();
    res.json(mascotas);
  }catch(error){
    res.json({error:error.message});
  }
})

app.get("/api/mascotas/:id", async(req:Request, res:Response) => {
  try{
    const mascota = await getMascotaId(req.params.id);
    res.json(mascota);
  }catch(error){
    if(error.message === "No se ha encontrado la mascota"){     
      res.status(404).json({error:error.message});
      return;
    }else{
      res.json({error:error.message});
    }
  } 
})

app.post("/api/mascotas", async(req:Request, res:Response) => {
  try{
    const {nombre, descripcion, tipo} = req.body;
    const nuevaMascota = await addMascota(nombre, descripcion, tipo);
    res.json(nuevaMascota);
  }catch(error){
    if(error.message == "Tipo incorrecto"){
      res.status(400).json({error:error.message});
      return;
    }else{
      res.json({error:error.message});
    }
  }
})


app.delete("/api/mascotas/:id", async(req:Request, res:Response) => {
  try{
    const id = req.params.id;
    await deleteMascota(id);
    res.json({message:"Mascota eliminada"});
  }catch(error){
    if(error.message == "No se ha encontrado la mascota"){
      res.status(404).json({error:error.message});
      return;
    }else{
      res.json({error:error.message});
    }
  }
})

app.listen(3000, () => { console.log("Funcionando en puerto 3000") });
