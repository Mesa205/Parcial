import  Jwt  from "jsonwebtoken";

export const generateToken=(payload) =>{
    try{

        const token=Jwt.sign(payload, "adc123", {
            expiresiIn:"30d",
        }) ;
        return token;

    } catch (error) {
        console.log("error en generar token", error.message)
    }
}