const User = require("../models/User");
const register = async(req, res, next) =>
{
    try
    {
        const {username, email ,password, birthDate, gender } = req.body; //getting necessary informations from request's body
        const user = await User.create({username:username, email:email, password:password, birthDate:birthDate, gender:gender});
        //we created an user with the informations.
        res.status(200).json({success:true, data:user});
    }
    catch(err)
    {
        //catch errors in async process.
        //Javascript can not catch errors in asynchronous processes. When occurs an error in synchronous process, our request gonna fall to an loop, our frontend application gonna try to send request again and again. Because for javascript can not catch errors in async processes, we can not show a message about error to user. We gonna write a error middleware function but this middleware function is special for error handling, therefore it gonna take a plus param called err. We gonna import it after the routers. Thus, when an error occurs we gonna pass it with next. It gonna fall to error middleware. Anymore we can show message about user.
        next(err);
    }
}

module.exports = {
    register
}
//we gonna use these functions in routes therefore we need to export this functions. If we dont export these functions, we can not redirect routes to there functions.
