import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
export const registerUser = async (req, res, next) => {
    const { userName,name, email, password, phone, role } = req.body
    try {
        let username = await User.findOne({userName:userName})
        let userEmail = await User.findOne({ email: email })
        if (userEmail) {
            return res.status(400).json({ succes: false, message: "User with that email address is already exists in out data base" })
        }
        if(username){
            return res.status(400).json({success:false,message:"User with that username already exists in our database"})
        }
        //password encryption
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        let user = new User({ userName,name, email, password:hashedPassword, phone, role })
        await user.save()
        return res.status(200).json({success:true,message:"User added"})
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}