import express from "express"
import { authenticate, restrict } from "../auth/verifyToken.js"
import { getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js"
const route = express.Router()
route.get("/getallusers", authenticate, restrict(["admin"]), getAllUsers)
route.put("/updateuser/:id", authenticate, restrict(["user","admin"]), updateUser)
route.delete("/deleteuser/:id", authenticate, restrict(["admin"]), deleteUser)
export default route