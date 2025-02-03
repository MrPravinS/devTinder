const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser()); // use for read a cookie
app.use(express.json()); // help to read json data

const authRouter = require('./routes/auth')
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/",authRouter)  // check the all routes in authROuter
app.use("/",profileRouter)
app.use("/",requestRouter)
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
