const express = require("express"); //importing express module.
const app = express(); //creating an app from express constructor.
require("dotenv").config({path:"./config/env/process.env"}); //to give some informations from config file, we imported dotenv module.
const connectDb = require("./helpers/database/connectDb"); //importing database helper function to make database connection.
const errorHandler = require("./middlewares/error/errorHandler"); //importing error handler.
const router = require("./routes/index"); //importing our app's routes structure

connectDb(); //it tries to connect database.

app.use(express.json()); //it parses the request body to json. It recognizes an incoming request as json object. Express provides you with middleware to deal with data in the body of request.

app.use("/",router); //We specified our app's url routers.
app.use(errorHandler); //If we catch an error in catch block, we gonna pass with next function to our errorHandler. Thus, our error handler send a response to user and will show a error message.

app.listen(process.env.PORT, ()=>console.log(`server started at ${process.env.PORT}`));
// It creates a server and listens port 5002 for connections.