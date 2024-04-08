import express from "express"
import { addFav, addRecipe, deleteFav, deleteRecipe, getFavourite, getOneRecipies, getRecipies, login, myRecipies, signUp } from "./controller.js"

const router = express.Router()

router.post("/login", login)
router.post("/signup", signUp)
router.post("/addrecipy", addRecipe)
router.post("/deleterecipy", deleteRecipe)
router.post("/addfav", addFav)
router.post("/deletefav", deleteFav)
router.post("/myrecipies", myRecipies)
router.post("/getrecipies", getRecipies)
router.post("/getfav", getFavourite)
router.post("/getOneRecipy", getOneRecipies)

export default router