import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
    email : {
        type: String
    },
    name:{
        type: String
    },
    ingredients: [{type: String}]
    ,
    recipeDetail: {
        type: String
    },
    img: {
        type: String
    },
    type: {
        type: String
    },
    recipeName: {
        type: String
    }
})
const recipeModel = mongoose.model("recipe", recipeSchema)
export default recipeModel