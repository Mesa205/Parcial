import mongoose from "mongoose";

const {Schema, model} =mongoose;

import bcrypt from "bcrypt";


const registerSchema= new Schema ({
    name:{
        type: String,
        required:[ true, " el campo es requerido"],
    },

    email:{
        type: String, 
        unique: true,
        required: [true, "el campo es requerido"]
    },
    password:{
        type: String,
        require:[true,"El campo Password es obligatorio "]
    },
},{
    timestamps: true
});

registerSchema.methods.matchPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

export const registerModel=model("register", registerSchema);
