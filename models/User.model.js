const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    userName:String,
    email:String,
    password:String
})

const UserModel=mongoose.model("b21_e4_evaluation_user",userSchema)

module.exports={
    UserModel
}