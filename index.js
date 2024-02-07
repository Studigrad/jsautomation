import express from "express"

const app = express()
const PORT = 3000

let usersBD = [
    {
        id:1,
        name:"Ilya" 
    },
    {
        id:2,
        name:"Vadim"
    }
]

app.use(express.json())

app.get("/users",(req,res)=>{
    res.json(usersBD)
})

app.get("/users/:id",(req,res)=>{
    let {id} = req.params
    let result = {statusCode:200, data: usersBD[id-1]}
    res.json(result)
})

app.post("/user",(req,res)=>{
    usersBD.push(req.body)
    res.json({statusCode:200,message:"User was added"})
})

app.delete("/user/:id",(req,res)=>{
    let {id} = req.params
    let name = usersBD[id-1].name
    usersBD = usersBD.filter(obj=> obj.id!=id)
    res.json({statusCode:200,message:`User ${name} was deleted`})
})

app.put("/user/:id",(req,res)=>{
    try{
        let {id} = req.params
        console.log(typeof id)
        if(typeof id != "number"){
            throw new Error("Provide pls number in params")
        }
        let {name} = req.body
        if(typeof name != "string"){
            throw new Error("Provide pls string in field name")
        }
        usersBD[id-1].name = name

        res.json({statusCode:200,message:`User ${name} was edited`})

    }catch(e){
        res.json({statusCode:400,message:e.message})
    }
    
})

app.listen(PORT,()=>{
    console.log("Listening on port 3000")
})