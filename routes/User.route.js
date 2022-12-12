const {Router}=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/User.model");
const userRoute=Router()

userRoute.post("/signup",async(req,res)=>{
    const {userName,email,password}=req.body;
    const isUser=await UserModel.findOne({email})
    if(isUser){
        res.send({"err":"User already exist"})
    }
    else{

        bcrypt.hash(password,4,async(err,hashed_password)=>{
            if(err){
                res.send({"err":"something wrong try again"})
            }
            else{
                let user=new UserModel({
                    userName,
                    email,
                    password:hashed_password
                })
               await user.save()
               res.send({"success":"Use signup success"})
            }
        })
    }

})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    let user=await UserModel.findOne({email})
    let hashed=user.password;
    
    bcrypt.compare(password,hashed,async(err,result)=>{
        if(result){
            let token=jwt.sign({email},process.env.SECRET)
            res.send({"token":token})
        }else{
            res.send({"err":"Login failed"})
        }
    })
})
module.exports={
    userRoute
}