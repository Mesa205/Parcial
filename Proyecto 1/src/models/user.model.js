import mongoose from "mongoose";

const {Schema, model} =mongoose;

import bcrypt from "bcrypt";


const userSchema= new Schema ({
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

userSchema.methods.matchPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

export const userModel=model("user", userSchema);
