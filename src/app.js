const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Pravin111",
    lastName: "shegamwar233",
    emailId: "pravin@.comwewe",
    password: "pravin12345ww",
  };

  const user = new User(userObj);

  try {
    await user.save();

    res.send("User Added Successfully");
  } catch (error) {
    res.status(500).send("Error during creating user");
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
