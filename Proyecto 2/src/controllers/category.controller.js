import { eliminarImagenCloudinary, subirImagenACloudinary } from "../helpers/cloudinary.actions.js";
import { deleteImg } from "../helpers/deleteimg.js";
import { response } from "../helpers/Response.js"
import { categoryModel } from "../models/category.model.js";
import { encryptPassword } from "../helpers/encryptPassword.js";
import { registerModel } from "../models/register.model.js";
import { loginModel } from "../models/login.model.js";
import { generateToken } from "../helpers/generateToken.js";

const categoryCtrl = {}


//Este Back tiene las  siguientes funciones:

// 1. debe iniciar servidor
// 2. debe registrarse con /register
// 3. iniciar en postman con /login
// 4. se le asignara un Token a su cuenta el cual servira para: Eliminar, Crear o Actualizar 



categoryCtrl.register=async(req,res)=>{

    const {id} = req.params;

    const user = await registerModel.findById(id)




    try{
        const{name, email,password}=req.body;
        const user=await registerModel.findOne({email})
        if(user){ 
            return response(res,409,false,"", "el email ya existe en otro registro")
        }

        const passwordEncrypt= encryptPassword(password);


        const newUser=new registerModel({name,email,password:passwordEncrypt});
        await newUser.save(); 

        const token=generateToken({user: newUser.id})
         


        response(res,201,true,{...newUser._doc, password:null, token},"usuario creado")
    } catch (error){
        response(res,500,false,"", error.message)
    }



 };

 categoryCtrl.login=async(req,res)=>{

        const {id} = req.params;

        const user = await loginModel.findById(id)





    try{

        const{password,email}= req.body;
        const user=await loginModel.findOne({email})

        if(user && bcrypt.compareSync(password, user.password) ){
            const token=generateToken({user:user._id});

            return response (res,200,true,{...user.toJSON(),password:null, token},"Bienvenido")
        }
        response(res, 400, false, "", "email o password incorrectos")

    } catch (error) {
        response(res, 500, false, "", error.message)

    }
 }


categoryCtrl.listar = async(req,res)=>{
    try {
        const category=await categoryModel.find()
        response(res,200,true,category,"Lista de Categoria")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
} ;

categoryCtrl.listarById = async (req,res) => {
    try {

        const {id} = req.params;

        const post = await categoryModel.findById(id)

        if(!post){
            return response(res,404,false,"","Categoria no encontrado")
        }


        response(res,200,true,post,"Categoria encontrado")
        

    } catch (error) {
        response(res,500,false,"",error.message)
    }
}




categoryCtrl.add=async(req,res)=>{
    try {


        const {title,description} = req.body
        const newPost= new categoryModel ({
            title,
            description,
        });



        if(req.file){
         const {secure_url,public_id}  = await subirImagenACloudinary(req.file)
         newPost.setImg({secure_url,public_id});
        }
            
        
        await categoryModel.create(newPost);
        response(res,201,true,newPost,"Categoria creado correctamente ");
        
    } catch (error) {
        response(res,500,false,"",error.message)
    }
};


categoryCtrl.delete = async (req,res) => {
    try {


        const {id} = req.params;

        const post = await categoryModel.findById(id)


        if(!post){
            return response(res,404,false,"","Categoria no encontrado ")}

        
        if(post.public_id){
            await eliminarImagenCloudinary(post.public_id)
        }

        await post.deleteOne();

        response(res,200,true,"","Categoria eliminado correctamente")

    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


categoryCtrl.update = async (req,res) => {
    try {

        const {id} = req.params;

        const post = await categoryModel.findById(id)


        if(!post){
            return response(res,404,false,"","Categoria no encontrado")}

       

        if(req.file){

            if(post.public_id){
                await eliminarImagenCloudinary(post.public_id)
            }
            const {secure_url,public_id}  = await subirImagenACloudinary(req.file)
            post.setImg({secure_url,public_id});
            await post.save()
        }


        await post.updateOne(req.body);

        response(res,200,true,"","Post actualizado ")

    } catch (error) {
        response(res,500,false,"",error.message)
    }
}



export default categoryCtrl;