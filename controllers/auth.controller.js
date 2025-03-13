import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'
// import crypto from 'crypto'
// crypto.randomBytes(256,(err,buffer)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(buffer.toString('hex'))
// })

//register user
export const registerUser = async (req, res, next) => {
    const { userName, name, email, password, phone, role } = req.body
    try {
        let username = await User.findOne({ userName: userName })
        let userEmail = await User.findOne({ email: email })
        if (username) {
            return res.status(400).json({ success: false, message: "User with that username already exists in our database" })
        }
        if (userEmail) {
            return res.status(400).json({ succes: false, message: "User with that email address is already exists in out data base" })
        }
        //password encryption
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        let user = new User({ userName, name, email, password: hashedPassword, phone, role })
        await user.save()
        return res.status(200).json({ success: true, message: "User added" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

//login user
export const loginUser = async (req, res, next) => {
    let { email, password } = req.body
    console.log(password)
    try {
        //checking whether email is present in db if it finds it is going to send entire user as a obj
        const user = await User.findOne({ email: email })
        // console.log(user)
        //if email is not there send res Email not found
        if (!user) {
            return res.status(400).json({ success: false, message: "Email not found!!!" })
        }
        //comparing the pwd in db if both are same or not by using compare this will take pwd from frontend and hashedPwd from db (user) if matches it will return true and we can login the user
        let isPasswordMatch = await bcrypt.compare(password, user.password)
        //if pwd not macthed
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Password doesn't macthed" })
        }
        //if pwd matches we need to generate jwt token
        const generateToken = (user) => {
            //from db(user) i am getting this id,role
            return jwt.sign({ id: user._id, role: user.role, username: user.userName }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        }
        const token = generateToken(user)
        //i am sending userInfo in res
        const { password: userPassword, role, ...rest } = user._doc;
        return res.status(200).json({ success: true, message: "Login Success", token, data: { ...rest } })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const googleLogin = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleCallback = (req, res) => {
    passport.authenticate('google', (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                success: false,
                message: 'Google Login Failed'
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.userName },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        // Send response
        res.status(200).json({
            success: true,
            message: 'Login Successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    })(req, res);
};

export const logoutUser = (req, res) => {
    req.logout(() => {
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    });
};