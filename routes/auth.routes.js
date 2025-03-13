import express from "express"
import { googleCallback, googleLogin, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js"

const routes = express.Router()
routes.post("/register" ,registerUser)
routes.post("/login",loginUser)
routes.get("/google",googleLogin)
routes.get('/google/callback',googleCallback)
routes.get('/logout',logoutUser)
export default routes