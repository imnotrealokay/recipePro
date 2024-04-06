import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
    email : {
        type: String
    },
    password:{
        type: String
    }
})
const authModel = mongoose.model("auth", authSchema)
export default authModel