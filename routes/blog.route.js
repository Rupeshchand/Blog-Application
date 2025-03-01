import express from "express"
import { createBlog, editBlog, getBlog, getBlogByQueryTopic, getBlogByTopic, getBlogs } from "../controllers/blog.controller.js"
const route = express.Router()
route.post("/createblog", createBlog)
route.put("/editblog/:id",editBlog)
route.get("/getsingleblog/:id",getBlog)
route.get("/getblogs",getBlogs)
route.get("/getblogbytopic/:topic",getBlogByTopic)

//http://localhost:8080/api/v1/blog/blogbyquery/?topic=js
route.get("/blogbyquery",getBlogByQueryTopic)
export default route