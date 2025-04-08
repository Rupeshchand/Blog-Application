import express from "express"
import passport from "passport"
import { dashboard, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js"

const routes = express.Router()
routes.post("/register" ,registerUser)
routes.post("/login",loginUser)
routes.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
routes.get('/google/callback', (req,res,next)=>{
    console.log("Hello callback")
    next()
},
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req,res)=>{
        res.redirect("/dashboard")
    }
)
routes.get("/dashboard",dashboard)
routes.get('/logout',logoutUser)
export default routes