import bcrypt from "bcrypt"

export const encryptPassword=(password)=>{
    const salt=bcrypt.genSaltSync(10);
   const passwordEncrypt=bcrypt.hashSync(password,salt);
   return passwordEncrypt;
   
     
}; 