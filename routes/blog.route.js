import express from "express"
import { createBlog } from "../controllers/blog.controller.js"
const route = express.Router()
route.post("/createblog", createBlog)
export default route