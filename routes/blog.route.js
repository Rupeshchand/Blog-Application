import express from "express"
import { createBlog, editBlog } from "../controllers/blog.controller.js"
const route = express.Router()
route.post("/createblog", createBlog)
route.put("/editblog/:id",editBlog)
export default route