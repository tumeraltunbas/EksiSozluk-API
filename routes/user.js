const { register } = require("../controllers/user");//importing user functions
const router = require("express").Router(); //creating a router object from express

router.post("/sign-up", register); //we created a sign-up router. It is post request because user will send us some information for register process.



module.exports = router; //exported this router to use it in main router page.