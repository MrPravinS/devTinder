const express = require("express")

const app = express()
app.get("/getUserData",(req,res)=>{
  try {

    throw new Error("skdms")
  } catch (error) {
    res.status(500).send("Some error contact team")
  }
})

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("Something went wrong")
  }
})

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
    
})