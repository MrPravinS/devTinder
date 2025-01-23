const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
app.use(cookieParser()); // use for read a cookie

app.use(express.json()); // help to read json data

app.post("/signup", async (req, res) => {
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

// login api
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //check email pass  for login

    // find email id in db
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password)

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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error in token  : " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  console.log("Sending a connection request");
  res.send(user.firstName + " Send Connection request");
});

connectDB()
  .then(() => {
    console.log("Database connection estabalish....");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection failed...");
  });
