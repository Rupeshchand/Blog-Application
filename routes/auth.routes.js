import express from "express"
import { loginUser, registerUser } from "../controllers/auth.controller.js"
const routes = express.Router()
routes.post("/registeruser" ,registerUser)
routes.post("/loginuser",loginUser)
export default routes