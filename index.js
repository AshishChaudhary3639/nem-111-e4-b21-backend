const express=require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const { todoRoute } = require("./routes/Todo.route")
const { userRoute } = require("./routes/User.route")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors())
app.use("/",userRoute)
app.use("/",todoRoute)
app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("DB connected successfuly")
    }catch(err){
        console.log("DB not connected")
        console.log(err)
    }
})