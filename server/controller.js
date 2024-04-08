import userModel from "./model/user.js";
import authModel from "./model/auth.js";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import recipeModel from "./model/recipe.js";

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
export const addFav = async (req, res) => {
    try {
        const {email, id} = req.body
        let foundUser = await userModel.findOne({email: email})
       
              foundUser.favorite.push(id)
              await foundUser.save()
                return res.status(200).json({success: true, data: foundUser.favorite})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}
export const deleteFav = async (req, res) => {
    try {
        const {email, id} = req.body
        let foundUser = await userModel.findOne({email: email})
       const index = foundUser.favorite.indexOf(id)
       foundUser.favorite.splice(index,1)
       await foundUser.save()
                return res.status(200).json({success: true,data: foundUser.favorite})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}
export const addRecipe = async (req, res) => {
    try {
        const {email, name, recipeDetail, ingredients,img, type,recipeName} = req.body
        const newRecipe = new recipeModel({
            name: name,
            email: email,
            recipeDetail: recipeDetail,
            ingredients: ingredients,
            img: img,
            type: type,
            recipeName: recipeName
        })
        await newRecipe.save()
        let foundUser = await userModel.findOne({email: email})
       foundUser.recipy.push(newRecipe._id)
       await foundUser.save()
        return res.status(200).json({success: true})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}


export const deleteRecipe = async (req, res) => {
    try {
        const {email, id} = req.body
        let foundUser = await userModel.findOne({email: email})
       const index = foundUser.recipy.indexOf(id)
       foundUser.recipy.splice(index,1)
       await foundUser.save()
     
       await recipeModel.findByIdAndDelete(id)
        return res.status(200).json({success: true})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}
export const myRecipies = async (req, res) => {
    try {
        const {email} = req.body
        let foundUser = await userModel.findOne({email: email})
        let recipeArray = []
        await Promise.all(
            foundUser.recipy.map(async (id) => {
                const recipe = await recipeModel.findOne({_id: id}) 
                recipeArray.push(recipe)
            })
        )
        return res.status(200).json({success: true, data: recipeArray})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}
export const getRecipies = async (req, res) => {
    try {
        const recipies = await recipeModel.find({})
       
        return res.status(200).json({success: true, data: recipies})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}
export const getFavourite = async (req, res) => {
    try {
        const {email} = req.body
        let foundUser = await userModel.findOne({email: email})
        let recipeArray = []
        await Promise.all(
            foundUser.favorite.map(async (id) => {
                const recipe = await recipeModel.findOne({_id: id}) 
                recipeArray.push(recipe)
            })
        )
        return res.status(200).json({success: true, data: recipeArray})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}
export const getOneRecipies = async (req, res) => {
    try {

        const recipy = await recipeModel.findOne({_id: req.body.id})
       
        return res.status(200).json({success: true, data: recipy})
           
        
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "internal server error"})
    }


}