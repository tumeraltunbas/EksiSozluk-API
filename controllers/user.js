const User = require("../models/User");
const register = async(req, res, next) =>
{
    try
    {
        const {username, email ,password, birthDate, gender } = req.body; //we get necessary informations from request's body
        console.log(username, email, password, birthDate, gender);
        const user = await User.create({username:username, email:email, password:password, birthDate:birthDate, gender:gender});
        //we created an user with the informations.
        res.status(200).json({success:true, data:user});
    }
    catch(err)
    {
        //catch errors in async process.
    }
}

module.exports = {
    register
}
//we gonna use these functions in routes therefore we need to export this functions. If we dont export these functions, we can not redirect routes to there functions.
