import cors from "cors"
import express from "express";
import morgan from "morgan"
import { connectDb } from "./database.js";
import  { dirname } from "path";

import { fileURLToPath } from "url";


import categoryRoutes from "./routes/category.route.js"


connectDb();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();



app.set("Port", 4000);
app.use("/public",express.static(__dirname + "/storage/imgs"))
app.use(morgan("dev"));
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Ruta predeterminada

app.use("/category",categoryRoutes)
app.use("/user", categoryRoutes )


app.listen(app.get("Port"),()=>{
    console.log("Servidor escuchando por el puerto" , app.get("Port"));
});