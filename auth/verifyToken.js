//authenticating the token after user performs login operation
import jwt from 'jsonwebtoken'

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
        
        req.userId = validatedToken.userId
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

//role based authorization