import User from "../models/User.model.js"
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password") //hiding the password using select method

        if (!users) {
            return res.status(404).json({ success: false, message: "Users not found" })
        }
        return res.status(200).json({ success: true, message: "Users found", data: users })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}