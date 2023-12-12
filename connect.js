// db/connect.js
const mongoose = require('mongoose');
const Movie = require('../models/movieModel');

const uri = "mongodb+srv://aminaiftikhar2908:Jlrdh2002@cluster0.qj4qppr.mongodb.net/Cluster0?retryWrites=true&w=majority";

const connectDB = async () => {
try {
    await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}
};

module.exports = connectDB;
