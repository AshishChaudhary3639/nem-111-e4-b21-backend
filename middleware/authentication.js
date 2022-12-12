const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/User.model")
require("dotenv").config()
const authentication=(req,res,next)=>{
    const {taskname,status,tag}=req.body
    let token=req.headers.authorization.split(" ")[1]


    jwt.verify(token,process.env.SECRET,async(err,decode)=>{
        if(err){
            res.send({"err":"You can do this tast try to login first"})
        }
        else{
            let {email}=decode
            const user=await UserModel.findOne({email})
            req.body.userId=user._id
            next()
        }
    })

}

module.exports={
    authentication
}