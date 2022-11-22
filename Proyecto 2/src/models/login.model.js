import mongoose from "mongoose";

const {Schema, model} =mongoose;

import bcrypt from "bcrypt";


const loginSchema= new Schema ({
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

loginSchema.methods.matchPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

export const loginModel=model("login", loginSchema);
