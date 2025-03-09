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
    location: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, //connecting blog schema to user schema bcse it contains user data
            ref: "User", //give the User schema reference
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
})
export default mongoose.model("Blog", blogSchema)