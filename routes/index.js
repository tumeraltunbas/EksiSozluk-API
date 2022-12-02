const router = require("express").Router();
const userRoute = require("./user");
//Router is a object that allows us to create and manage our app's routes in modular structure. 
//We can define other routers in it with router.use() method.
const titleRoute = require("./title");
const adminRoute = require("./admin");


router.use("/user", userRoute); //use user route
router.use("/title", titleRoute); //use title route
router.use("/admin", adminRoute); //use admin route

module.exports = router; //exported this router to use in server.js