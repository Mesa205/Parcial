import { Router } from "express";
import postCtrol from "../controllers/post.controller.js";
import { upload } from "../middleware/imgUpload.js";
import {check} from "express-validator"
import { validFields } from "../middleware/ValidFields.js";
 


const route = Router();

route.get("/",postCtrol.listar)



route.post("/",


upload.single("img"),[
    check("title","El campo title es obligatorio").notEmpty(),
    check("description","El campo descripción es obligatorio").notEmpty().optional(),
],

validFields,postCtrol.add)
route.get("/:id",postCtrol.listarById)
route.delete("/:id",postCtrol.delete)
route.put("/:id",upload.single("img"),postCtrol.update)

export default route;