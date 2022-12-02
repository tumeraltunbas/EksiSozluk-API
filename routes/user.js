const { signUp, login ,profile,logout, follow,unfollow,forgotPassword,resetPassword} = require("../controllers/user");//importing user functions
const { getAccessToRoute } = require("../middlewares/authorization/authorization");
const { isUserExists } = require("../middlewares/database/queryHelpers");
const router = require("express").Router(); //creating a router object from express

router.post("/sign-up", signUp); //we created a sign-up route. It is post request because user will send us some information for register process.
router.post("/login", isUserExists, login); //we created a login route. It is post request because user will send us username email and password for login but before this process, we gonna check user.
router.get("/profile", getAccessToRoute, profile); //we created a profile route. The user can access profile informations from here.
router.get("/logout", getAccessToRoute, logout); //we created a logout route. The user's access token will change with null.
router.get("/follow/:user_id", [getAccessToRoute, isUserExists], follow); //follow route
router.get("/unfollow/:user_id",[getAccessToRoute, isUserExists], unfollow); //unfollow route
router.post("/forgotpassword", isUserExists, forgotPassword); //if user forget his password, gonna send request to this route.
router.put("/resetpassword", resetPassword); //If user send request this url with valid parameters we gonna allow to change password process.
module.exports = router; //exported this router to use it in main router page.