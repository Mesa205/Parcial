import mongoose from "mongoose";



const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "el title es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La description es obligatoria"],
    },

    imgUrl:{
      type:String,
      default:null,
    },

    // nameImage: String,

    public_id:String,

  },
  {
    timestamps: true,
  }
);

// postSchema.methods.setImg = function setImg(filename){
//   const url= `http://localhost:4000/public/`
//   this.imgUrl = url + filename;
//   this.nameImage=filename;
// }

categorySchema.methods.setImg = function setImg({secure_url,public_id}){
  this.imgUrl = secure_url;
  this.nameImage= public_id;
}


export const categoryModel=model("category",categorySchema)
