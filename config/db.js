const mongoose=require("mongoose")
require("dotenv").config()
console.log("DB not connected")
const connection=mongoose.connect(process.env.MONGO_ATLAS_URL)

module.exports={
    connection
}