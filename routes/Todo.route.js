const {Router}=require("express")
const { authentication } = require("../middleware/authentication")
const { TodoModel } = require("../models/Todo.model")

const todoRoute=Router()

todoRoute.post("/create",authentication,async(req,res)=>{
    const {taskname,status,tags,userId}=req.body

    try{
        let todo=new TodoModel({
            taskname,
            status,
            tags,
            userId
        })

        await todo.save()
        res.send({"success":"Data added successfully"})
    }
    catch(err){
        res.send({"err":"Data not added try to login again"})
    }

})

todoRoute.get("/todos",authentication,async(req,res)=>{
    const {userId}=req.body;

    try{
        let todos=await TodoModel.find({userId})
        res.send(todos)

    }catch(err){
        res.send({"err":"Can't access try to login first"})
    }
})

todoRoute.get("/todos?",authentication,async(req,res)=>{
    const {status,tags}=req.query
    try{
        let data=await TodoModel.find({
            $or:[
                {status:status,$option:"i"}
            ]
        })
        res.send(data)
    }catch(err){
        res.send({"err":"could not fetch"})
    }
})

todoRoute.patch("/todos/:id",authentication,async(req,res)=>{
    const {taskname,status,tags}=req.body;
    const {id}=req.params

    try{
        let payload={
            taskname,
            status,
            tags
        }

        await TodoModel.findByIdAndUpdate({_id:id},payload)
        res.send({"success":"Data updated"})
    }
    catch(err){
        res.send({"err":"Data not updated try to login"})
        
    }


})

todoRoute.delete("/todos/:id",authentication,async(req,res)=>{
    const {id}=req.params
    try{

        await TodoModel.findByIdAndDelete({_id:id})
        res.send({"success":"Data Deleted"})
    }
    catch(err){
        res.send({"err":"Data not Deleted try to login"})
        
    }


})

module.exports={
    todoRoute
}