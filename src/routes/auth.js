const express = require("express");
const User = require("../models/user")
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new instances of the User model
    // const user = new User(req.body); bad way to create user

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.send("User Added Successfully");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //check email pass  for login

    // find email id in db
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create a jwt token
      const token = await user.getJWT(); //
      // secretkey // token expire time

      // add the token to cookie and send the response back to the user

      res.cookie("token", token);
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Login Error : " + error.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
   res.cookie("token",null,{
      expires: new Date(Date.now()), // expire cookie right there immidiet or in current time 
   })
   res.send("User Logout successfull!!")
})

module.exports = authRouter;
