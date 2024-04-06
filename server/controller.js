import userModel from "./model/user.js";
import authModel from "./model/auth.js";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

dotenv.config()

export const signUp = async (req, res) => {
    try {
        const {email, password, name} = req.body
        let foundUser = await authModel.findOne({email: email})
        if(foundUser){
            return res.status(200).json({success: false, message: "User with this email already exists"})
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newAuth = new authModel({
            email: email,
            password: encryptedPassword
        })
        await newAuth.save()
        const newUser = new userModel({
            email: email,
            name: name
        })
        await newUser.save()
        return res.status(200).json({success: true, message: "Success", data: newUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}
export const login = async (req, res) => {
    try {
        const {email, password, name} = req.body
        let foundUser = await authModel.findOne({email: email})
        if(foundUser){
            const matchPassword = await bcrypt.compare(password, foundUser.password)
            if(matchPassword){
                let foundUser2 = await userModel.findOne({email: email})
                return res.status(200).json({success: true, message: "Success", data: foundUser2})
            }
            return res.status(200).json({success: false, message: "Wrong password"})
        }
     
        return res.status(200).json({success: false, message: "Account with this email does not exist try sign up"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}