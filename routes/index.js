const router = require("express").Router();
const userRoute = require("./user");
//Router is a object that allows us to create and manage our app's routes in modular structure. 
//We can define other routers in it with router.use() method.

router.use("/user", userRoute);


module.exports = router; //exported this router to use in server.js