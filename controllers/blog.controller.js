import mongoose from 'mongoose'
import Blog from '../models/Blog.model.js'
//for creating blog
export const createBlog = async (req, res, next) => {
    const { title, content, topic, image, ref, location } = req.body
    try {
        const blog = new Blog({
            title, content, topic, image, ref, location
        })
        await blog.save()
        return res.status(200).json({ succes: true, message: "Blog Saved Successfully" })
    } catch (error) {
        return res.status(500).json({ succes: false, message: "Internal Server Error" })
    }
}
//for editing blog
export const editBlog = async (req, res, next) => {
    const blogId = req.params.id //using params i am getting the id
    try {
        const blog = await Blog.findById(blogId) //for checking id in db
        if (!blog) {
           return res.status(404).json({ success: false, message: "Blog not found" })
        }
        await Blog.findByIdAndUpdate(blogId, { $set: req.body }, { new: true }) //updating data by using findByIdAndUpdate
        return res.status(200).json({ success: true, message: "Blog Updated" }) //"" is not required because at first it obj when it touches express.json() it will be in obje by using json we are telling we need to convert this obj to json format
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

//for getting single blog by id
export const getBlog = async (req, res, next) => {
    const blogId = req.params.id
    try {
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(400).json({success:false,message:"ID not found"})
        }
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        return res.status(200).json({ success: true, message: "Blog Found" })   

    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

//for getting all blogs
export const getBlogs = async(req,res,next)=>{
    try{
        const blogs = await Blog.find()
        return res.status(200).json({success:true,message:"Blogs Found",data:blogs})
    }
    catch{
        res.status(500).json({success:false,text:"Internal Server Error"})
    }
}