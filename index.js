import express from "express"
//before route is getting executed we need to tell the server that data which we are getting from client to server if we are getting that data in headers we need to parse the data
import cookieParser from "cookie-parser"
//for creating proxy server, we can share info from c tp s or s to c. To tell browser the server is safe. 
import cors from "cors"
import mongoose from "mongoose"
import path from 'path'
import blogRouter from './routes/blog.routes.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import passport from 'passport'
import session from 'express-session'

//allow to have access of env data to all the files
import dotenv from "dotenv"
dotenv.config()//help u to config dotenv files

const app = express()
const port = process.env.PORT || 8080
// app.use(cors({
//     origin: ["http://localhost:3000/"], //it will allow 3000 port to access data from server
//     methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
//     credentials: true //to perform authorization it will allow us to send passwords
// }))
// app.use(cors({
//     origin: function(origin,cb){
//         return cb(null,true)
//     }
// }))
// app.use(cors({
//     origin: true, // it will take origin automatically and no need of mentioning methods
//     credentials: true
// }))
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));
app.use(cookieParser()) //before server is starting cookies will be parsed
app.use(express.json()) //to parse json data
app.use(express.static("public"))

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//initalize passport
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/v1/blog", blogRouter)
app.use("/api/v1/auth/", authRouter)
app.use("/api/v1/user/", userRouter)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
        app.listen(port, () => {
            console.log(`Server is running at ${port}`)
        })
    }
    catch (error) {
        console.log("DB Connection Error", error)
    }
}
connectDB()