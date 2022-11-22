import { Router } from "express";
import { upload } from "../middleware/imgUpload.js";
import {check} from "express-validator"
import { validFields } from "../middleware/ValidFields.js";
import categoryCtrl from "../controllers/category.controller.js";
import { verifyToken } from "../middleware/auth.js";
 


const route = Router();


route.post('/register',verifyToken, categoryCtrl.register);
route.post('/login',verifyToken, categoryCtrl.login);

route.get("/",categoryCtrl.listar)
route.get("/:id",categoryCtrl.listarById)


route.post("/", verifyToken,


upload.single("img"),[
    check("title","El campo name es obligatorio").notEmpty(),
    check("description","El campo descripción es obligatorio").notEmpty().optional(),
],

validFields,categoryCtrl.add)

route.delete("/:id",verifyToken,categoryCtrl.delete)
route.put("/:id",verifyToken,upload.single("img"),categoryCtrl.update)

export default route;