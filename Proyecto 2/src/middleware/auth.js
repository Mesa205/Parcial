import  Jwt  from "jsonwebtoken";
import { response } from "../helpers/Response.js";

export const verifyToken=async(req,res,next)=>{
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token= req.headers.authorization.split(" ")[1]
        Jwt.verify(token, "abc123",(err,payload)=>{
             if(err){
                return response(res,401,"", "no esta autorizado")
        }

        req.userId=payload.user;
        next()

           


        })
        // console.log(token);
    }
    if(!token){
        return response(res,401,"", "no esta autorizado")
    }
}