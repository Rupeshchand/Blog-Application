import express from "express"
import { authenticate, restrict } from "../auth/verifyToken.js"
import { getAllUsers, updateUser, deleteUser, getSingleUserProfile } from "../controllers/user.controller.js"
const route = express.Router()
route.get("/getallusers", authenticate, restrict(["admin"]), getAllUsers)
route.put("/updateuser/:id", authenticate, restrict(["user"]), updateUser)
route.delete("/deleteuser/:id", authenticate, restrict(["admin"]), deleteUser)
route.get("/me", authenticate, restrict(["user"]), getSingleUserProfile)
export default route