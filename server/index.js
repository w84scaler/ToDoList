require('dotenv').config()
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasksroute");
const userRoutes = require('./routes/userroute')
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/todolist", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err) => {
    if (err) return console.log(err);
});

global.appRoot = path.resolve(__dirname);

app.use(express.json());

var cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
    }))

const cookies = require("cookie-parser");
app.use(cookies());

app.use("/api", tasksRoutes);
app.use('/user', userRoutes)

app.listen(3228, () => console.log("Server is running"));