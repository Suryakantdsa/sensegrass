const express=require("express")
const app =express()
const cors=require("cors")
const mongoose=require("mongoose")
// const Jwt=require("jsonwebtoken")
const jwtKey="todo"
// const { connect } = require("./dbConfig/dbConfig")

const Task=require("./Models/tasks")
const uri="mongodb+srv://Suryakant:Suryadas@cluster0.mydbwj6.mongodb.net/Task-mangement-app?retryWrites=true&w=majority"

// connect()

mongoose.connect(uri)
.then(()=>{console.log("connected to db successfully")})

app.use(express.json())
app.use(cors())

app.get("/api/s",async(req,res)=>{
    res.send({status:"working fine"})
})

app.post("/addtask", async (req, resp) => {
    try {
        let newTask = new Task(req.body)
        let result = await newTask.save();
        resp.send(result)
        
    }
    catch {
        resp.status(400).json({ message: "enter a vaild note" })
    }
})

app.get("/", async (req, resp) => {
    try {
        let allTask = await Task.find();
        if (allTask.length > 0) {
            resp.send(allTask)
            console.log(allTask)
        }
        else {
            resp.send({ result: "no product found" })
        }
    }

    catch {
        resp.status(400).json({ message: "no products found" })
    }
})

app.get("/task/:id", async (req, resp) => {
    try {

        let result = await Task.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        }
        else {
            resp.send({ result: "no record found" })
        }
    }
    catch {
        resp.status(400).json({ message: "no task is found" })
    }
})
app.put("/task/:id", async (req, resp) => {
    try{

        let result = await Task.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        resp.send(result)
    }
    catch{
        resp.status(400).json({ message: "error in upadating" })
    }
})

app.delete("/task/:id", async (req, resp) => {
    try {
        let result = await Task.deleteOne({ _id: req.params.id })
        resp.send(result)
    }
    catch {
        resp.status(400).json({ message: "no product is found to be delete" })
    }
})



app.listen(5000,()=>{console.log("app is running on port5000")})
