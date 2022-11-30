const { signUp, login ,profile,logout, follow,unfollow} = require("../controllers/user");//importing user functions
const { getAccessToRoute } = require("../middlewares/authorization/authorization");
const { isUserExists } = require("../middlewares/database/queryHelpers");
const router = require("express").Router(); //creating a router object from express

router.post("/sign-up", signUp); //we created a sign-up route. It is post request because user will send us some information for register process.
router.post("/login", isUserExists, login); //we created a login route. It is post request because user will send us username email and password for login but before this process, we gonna check user.
router.get("/profile", getAccessToRoute, profile); //we created a profile route. The user can access profile informations from here.
router.get("/logout", getAccessToRoute, logout); //we created a logout route. The user's access token will change with null.
router.get("/follow/:user_id", [getAccessToRoute, isUserExists], follow);
router.get("/unfollow/:user_id",[getAccessToRoute, isUserExists], unfollow);

module.exports = router; //exported this router to use it in main router page.