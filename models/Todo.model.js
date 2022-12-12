const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
    taskname:String,
    status:String,
    tags:String,
    userId:String
})

const TodoModel=mongoose.model("todo_crud_app",todoSchema)

module.exports={
    TodoModel
}