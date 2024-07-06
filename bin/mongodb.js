require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI), {userNewUrlParser:true}, (error)=>{
    if(error){
        throw error;
    }else{
        console.log("Connected to the database")
    }
}

module.exports = mongoose;