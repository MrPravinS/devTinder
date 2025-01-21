const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json()); // help to read json data

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new instances of the User model
    // const user = new User(req.body); bad way to create user
    // console.log(user);

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Login Error : " + error.message);
  }
});

// get user by email

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail }); // write exact what you write in schema
    if (users.length === 0) {
      // becos user object in arr
      res.status(500).send("user not found");
    }
    res.send(users);
  } catch (error) {
    res.status(500).send("somthing went wrong");
  }
});

// get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // get all the users
    res.send(users);
  } catch (error) {
    res.status(400).send("");
  }
});

// get by id
app.get("/feedById", async (req, res) => {
  // find by id of the collection
  const id = req.body._id;
  try {
    const users = await User.findById({ _id: id }); // get all the users
    res.send(users);
  } catch (error) {
    res.status(400).send("");
  }
});

// delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted successfully");
  } catch (error) {
    res.status(400).send("User of this id not found");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.body.userId;

  const data = req.body;

  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "skills", "gender", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("update are not allowed");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated successfully");
  } catch (error) {
    res.status(404).send("something went wrong");
  }
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
