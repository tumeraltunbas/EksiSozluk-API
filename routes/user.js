const { signUp, login } = require("../controllers/user");//importing user functions
const { isUserExists } = require("../middlewares/database/queryHelpers");
const router = require("express").Router(); //creating a router object from express

router.post("/sign-up", signUp); //we created a sign-up router. It is post request because user will send us some information for register process.
router.post("/login", isUserExists, login); //we created a login router. It is post request because user will send us username email and password for login but before this process, we gonna check user.


module.exports = router; //exported this router to use it in main router page.