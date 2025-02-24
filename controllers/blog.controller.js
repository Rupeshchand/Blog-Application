import Blog from "../models/Blog.model.js"

export const createBlog = async (req, res, next) => {
    const { title, content, topic, image, ref, location } = req.body
    try {
        let blog = new Blog({
            title, content, topic, image, ref, location
        })
        await blog.save()
        res.status(200).json({success:true,message:"Blog saved successfully"})
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}