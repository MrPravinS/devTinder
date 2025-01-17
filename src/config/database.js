const mongoose = require("mongoose")


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://shegamwarp:shegamwarp@cluster0.ppyea.mongodb.net/DevTinder")
};


module.exports = connectDB;