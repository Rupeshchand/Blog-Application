import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    role:{
        type:String,
        enum:["admin","user"], //enum is a property here it will allow admin and user property
        default:"user"
    }
})
export default mongoose.model("User",userSchema)