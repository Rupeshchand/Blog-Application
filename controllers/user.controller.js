import mongoose from "mongoose"
import User from "../models/User.model.js"

//get all users
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

//updating the user
export const updateUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const updateUser = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true })
        const { password, ...rest } = updateUser._doc
        return res.status(200).json({ success: true, message: "User updated", user: { ...rest } })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

//deleting the user
export const deleteUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        await User.findByIdAndDelete(userId)
        return res.status(200).json({ success: true, message: "User Deleted" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

//for getting single user profile
export const getSingleUserProfile = async (req, res, next) => {
    const userId = req.userId
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const { password, ...rest } = user._doc
        return res.status(200).json({ success: true, message: "User found", data: {...rest} })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}