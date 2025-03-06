import express from "express"
import { authenticate, restrict } from "../auth/verifyToken.js"
import { getAllUsers } from "../controllers/user.controller.js"
const route = express.Router()
route.get("/getallusers",authenticate,restrict(["admin"]),getAllUsers)
export default route