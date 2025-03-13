import mongoose from 'mongoose'
import Blog from '../models/Blog.model.js'
import User from '../models/User.model.js'

//for creating blog
export const createBlog = async (req, res, next) => {
    const { title, content, topic, image, ref, location } = req.body
    const userId = req.userId
    try {
        //another way for gettting userId and name bcs findByone will give obj if it is correct
        const user = await User.findById(userId)
        const blog = new Blog({
            title, content, topic, image, ref, location, author: { id: userId, name: user.name }//req.name
        })
        await blog.save()
        return res.status(200).json({ success: true, message: "Blog Saved Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
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
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ success: false, message: "ID not found" })
        }
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        return res.status(200).json({ success: true, message: "Blog Found",data:blog })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

//for getting all blogs
export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
        return res.status(200).json({ success: true, message: "Blogs Found", data: blogs })
    }
    catch {
        return res.status(500).json({ success: false, text: "Internal Server Error" })
    }
}

//getting blog by topic
export const getBlogByTopic = async (req, res, next) => {
    const t = req.params.topic
    try {
        const blogs = await Blog.find({ topic: new RegExp(t, "i") })
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ success: false, message: `Topic not found on ${t}` })
        }
        res.status(200).json({ success: true, message: "Topic found", data: blogs })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

//get blog query parameters
export const getBlogByQueryTopic = async (req, res, next) => {
    const topic = req.query.t
    try {
        const blogs = await Blog.find({ topic: new RegExp(topic, "i") })
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ success: false, message: `not found on query ${topic}` })
        }
        return res.status(200).json({ success: true, message: `Blog found query ${topic}`, data: blogs })
    } catch (error) {
        return res.status(500).json({ success: false, text: "Internal Server Error" })
    }
}

//delete a blog
export const deleteBlog = async (req, res, next) => {
    const blogId = await req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(401).json({ success: false, message: "Invalid Blog ID" })
        }
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        await Blog.findByIdAndDelete(blogId)
        return res.status(200).json({ success: true, message: "Blog deleted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}