import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email : {
        type: String
    },
    name:{
        type: String
    },
    favorite: [{type: String}]
    ,
    recipy: [{type: String}]
})
const userModel = mongoose.model("user", userSchema)
export default userModel