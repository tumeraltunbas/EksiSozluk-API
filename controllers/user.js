const { inputValidation, comparePasswords } = require("../helpers/authorization/inputHelpers");
const CustomizedError = require("../helpers/error/CustomizedError");
const { saveJwtToCookie } = require("../helpers/jwt/tokenHelpers");
const User = require("../models/User");
const signUp = async(req, res, next) =>
{
    try
    {
        const {username, email ,password, birthDate, gender } = req.body; //getting necessary informations from request's body
        const user = await User.create({username:username, email:email, password:password, birthDate:birthDate, gender:gender});
        //we created an user with the informations.
        saveJwtToCookie(user, res);
    }
    catch(err)
    {
        //catch errors in async process.
        return next(err);
    }
}


const login = async(req,res,next) =>
{
    try
    {
        const {email, password} = req.body;
        if(inputValidation(email, password) == false) //inputs are blank or not provided.
        {
            const error = new CustomizedError(400, "Please provide a valid email and password");
            return next(error);
        }
        const user = await User.findOne({email:email}).select("+password");
        //the user with this email is exists because it pass middleware.
        //When we are creating our user model, we marked password's select feature as false. That's mean when making query it does not include the password. It brings a query without password information. But we included password with select function for query to make password compare. 
        if(comparePasswords(password, user.password) == false)
        {
            //The user's password and provided password did not match.
            const error = new CustomizedError(400, "Your password is wrong");
            return next(error);
        }
        saveJwtToCookie(user, res);
    }
    catch(err)
    {
        return next(err);
    }
}

module.exports = {
    signUp,
    login
}
//we gonna use these functions in routes therefore we need to export this functions. If we dont export these functions, we can not redirect routes to there functions.
