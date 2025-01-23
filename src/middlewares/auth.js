const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req,res,next) => {
 try {
    //read the token from the req cokkie
 const {token} = req.cookies;
 if(!token){
    throw new Error("Token is not valid!!!!!")
 }

 const decodeObj = await jwt.verify(token, "DEV@Tinder123")

 const {_id} = decodeObj;

 const user = await User.findById(_id);
 if(!user){
    throw new Error("User not found")
    
 }
 req.user = user
 next();
 } catch (error) {
    res.status(400).send("Authentication error :"+error.message)
 }



 //validate the token
 // find the user


}

module.exports={userAuth}