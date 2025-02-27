import express from "express"
import { createBlog, editBlog, getBlog, getBlogs } from "../controllers/blog.controller.js"
const route = express.Router()
route.post("/api/v1/create/createblog", createBlog)
route.put("/api/v1/edit/editblog/:id",editBlog)
route.get("/api/v1/get/getsingleblog/:id",getBlog)
route.get("/api/v1/getall/getblogs",getBlogs)
export default route