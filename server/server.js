import express from "express"
const app = express()
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import router from "./router.js"

dotenv.config()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
app.use("/", router)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})