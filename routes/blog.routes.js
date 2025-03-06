import express from "express"
import { createBlog, deleteBlog, editBlog, getBlog, getBlogByQueryTopic, getBlogByTopic, getBlogs } from "../controllers/blog.controller.js"
import { authenticate, restrict } from "../auth/verifyToken.js"
const route = express.Router()
route.post("/createblog", authenticate, createBlog)
route.put("/editblog/:id", authenticate, editBlog)
route.get("/getsingleblog/:id", getBlog)
route.get("/getblogs", getBlogs)
route.get("/getblogbytopic/:topic", getBlogByTopic)
route.delete("/deleteblog/:id", authenticate, restrict(["admin"]), deleteBlog)

//http://localhost:8080/api/v1/blog/blogbyquery/?topic=js
route.get("/blogbyquery", getBlogByQueryTopic)
export default route