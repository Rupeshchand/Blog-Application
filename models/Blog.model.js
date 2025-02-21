import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ref: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    location:String,
    // user:{
    //     id:{

    //     },
    //     name:{

    //     }
    // }
})
export default mongoose.model("Blog", blogSchema)