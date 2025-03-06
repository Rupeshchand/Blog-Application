//authenticating the token after user performs login operation
import jwt from 'jsonwebtoken'
import User from "../models/User.model.js"
//authenticating the user
export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;
    //here we are checking two conditions one is if token not there and if token there but it's not startswith 'Bearer'
    if (!authToken || !authToken.startsWith("Bearer")) {
        return res.status(401).json({ success: false, message: "Authorization Denied" })
    }
    try {
        //extracting token from bearer token
        const token = authToken.split(' ')[1]
        //verifying the token if it matches it is going to send user payload
        const validatedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("TOken",validatedToken)
        req.userId = validatedToken.id
        req.role = validatedToken.role
        req.username = validatedToken.username
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired" })
        }
        return res.status(401).json({ success: false, message: "Invalid Token" })
    }
}

//autherizing the user based on roles
export const restrict = (roles)=> async(req,res,next)=>{
    try {
        const userId = req.userId //i am getting it after user loggedin we have this in authenticate
        console.log(userId)
        const user = await User.findById(userId) //that id i'm checking in db whether it is there or not
        //here no need of checking the error again bcse this id we got after authenticating \
        const userRole = user.role
        //for user here i am checking two conditions if user role is user and roles which we are receiving from calling the function contains user or not  
        if(userRole === "user" && roles.includes("user")){
            next()
        }
        //for admin
        else if(userRole === "admin" && roles.includes("admin")){
            next()
        }
        else{
            return res.status(401).json({success:false,message: `${userRole} is not authorized to access this data`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"})        
    }
}