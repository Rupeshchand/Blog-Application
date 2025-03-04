import express from "express"
import { registerUser } from "../controllers/auth.controller.js"
const routes = express.Router()
routes.post("/registeruser" ,registerUser)
export default routes