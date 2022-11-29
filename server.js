const express = require("express");
const app = express();
require("dotenv").config({path:"./config/env/process.env"});


app.listen(process.env.PORT, ()=>console.log(`server started at ${process.env.PORT}`));