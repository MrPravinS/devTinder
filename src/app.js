const express = require("express")

const app = express()
app.get('/',(req,res)=>{
    res.send("Server is On")
})

app.get('/test',(req,res)=>{
    res.send("test page")
})

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
    
})