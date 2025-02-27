import express from "express"
import { createBlog, editBlog, getBlog } from "../controllers/blog.controller.js"
const route = express.Router()
route.post("/createblog", createBlog)
route.put("/editblog/:id",editBlog)
route.get("/getblog/:id",getBlog)
export default route