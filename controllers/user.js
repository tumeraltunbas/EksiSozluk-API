const { inputValidation, comparePasswords } = require("../helpers/authorization/inputHelpers");
const CustomizedError = require("../helpers/error/CustomizedError");
const { saveJwtToCookie } = require("../helpers/jwt/tokenHelpers");
const {mailsender,createMailConfig} = require("../helpers/mail/nodemailer");
const User = require("../models/User");
const signUp = async(req, res, next) =>
{
    try
    {
        const {username, email ,password, birthDate, gender } = req.body; //getting necessary informations from request's body
        const user = await User.create({username:username, email:email, password:password, birthDate:birthDate, gender:gender});
        //we created an user with the informations.
        saveJwtToCookie(user, res);
        mailsender(createMailConfig(user.email, "Welcome to Our Website", "<p>We just wanted to welcome.</p>"));
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

const profile = async(req,res,next) =>
{
    try
    {
        const user = await User.findById(req.user.id);  //finding the user under the request thanks to jwt
        res.status(200).json({success:true, data:user});
    }
    catch(err)
    {
        return next(err);
    }
}

const logout = (req, res, next) =>
{
    //In logout process, we need to make user's access_token invalid. Because when a user logged out. He cant access to routes that need to login for reach. Therefore we changed access_token to null.
    res
    .status(200)
    .cookie("access_token", null, {httpOnly:true, expires:new Date(Date.now())})
    .json({success:true, message:"You are successfully logged out"})
}

const follow = async(req, res, next) =>
{
    try
    {
        const {user_id} = req.params; //taking user_id for follow

        const currentUser = await User.findById(req.user.id); //the user under the requesttama
        const userToFollow = await User.findById(user_id); // the user will be followed

        if(currentUser.following.includes(userToFollow.id) && userToFollow.followers.includes(currentUser.id))
        {
            //if user is already following this user pass an error
            const error = new CustomizedError(400, "You are already following this user");
            return next(error);
        }
        //If user is not following
    
        currentUser.following.push(userToFollow.id); //add followed user id to user's following
        currentUser.followingCount = currentUser.following.length; //taking current following count

        userToFollow.followers.push(req.user.id); //add user's id to followed user's followers
        userToFollow.followersCount = userToFollow.followers.length; //taking current followers count

        await currentUser.save();
        await userToFollow.save();

        res.status(200).json({success:true, data:currentUser, message:"Follow process successfull"});
    }
    catch(err)
    {
        return next(err);
    }
}


const unfollow = async(req, res, next) =>
{
    try
    {
        const {user_id} = req.params;
        const userToUnfollow = await User.findById(user_id);
        const currentUser = await User.findById(req.user.id);

        if(!currentUser.following.includes(userToUnfollow.id) && !userToUnfollow.followers.includes(currentUser.id))
        {
            const error = new CustomizedError(400,"You are not following this user already");
            return next(error)
        }

        currentUser.following.splice(currentUser.following.indexOf(userToUnfollow.id), 1);
        currentUser.followingCount = currentUser.following.length;
    
        userToUnfollow.followers.splice(userToUnfollow.followers.indexOf(currentUser.id),1);
        userToUnfollow.followersCount = userToUnfollow.followers.length;

    
        await currentUser.save();
        await userToUnfollow.save();
        res.status(200).json({success:true, data:currentUser, message:"Unfollow process successfull"});

    }
    catch(err)
    {
        return next(err);
    }
}

const forgotPassword = async (req, res, next) =>
{
    /*
        for the successfully password reset process, we need to follow several steps
        1 - Create a random string and hash it.
        2 - Save it to user's reset password property and determine a reset password token expires. After this time the token will be invalid.
        3 - Create a url with user's reset password token.
        4 - Send email this url to user.
        5 - If user send request with this url, make reset password process.
    */
    const {email} = req.body;
    const user = await User.findOne({email:email}); //find user from email
   try
   {
    user.generateResetPasswordToken(); //generate reset password token and assign it to properties
    await user.save(); //save, therefore the token and expires will be saved to user.
    const url = `http://localhost:5002/user/resetpassword?resetpasswordtoken=${user.resetPasswordToken}`
    //we createad a url that provides a reset password token query. 
    mailsender(createMailConfig(user.email, "About your password reset request", `<a href='${url}'>Link</a>`));
    //we are sending this url to user
    res.status(200).json({success:true, message:`The reset password link sent to ${user.email}`});
   }
   catch(err)
   {
    //if any error occurs in generate or url processes. we gonna make null these properties for security purposes.
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpires = null;
    await user.save();
    return next(err);
   }
}

const resetPassword = async (req, res, next) =>
{
    try
    {
        const {resetpasswordtoken} = req.query; //taking the reset password token from url
        const {password} = req.body; //taking new password from body
        const user = await User.findOne({resetPasswordToken:resetpasswordtoken, resetPasswordTokenExpires: {$gt:Date.now()}});
        //we are finding user with this token
        if(user==null)
        {
            //if user is not exists
            const error = new CustomizedError(400, "It's a invalid token or your token has been expired");
            return next(error);
        }
        user.password = password; //change user's password with new password
        user.resetPasswordToken = null; //after the change, make reset password token and expires values null.
        user.resetPasswordTokenExpires = null;
        await user.save();
        res.status(200).json({success:true, data:user, message:"Password successfully changed"});
    }
    catch(err)
    {
        return next();
    }
}

module.exports = {
    signUp,
    login,
    profile,
    logout,
    follow,
    unfollow,
    forgotPassword,
    resetPassword
}
//we gonna use these functions in routes therefore we need to export this functions. If we dont export these functions, we can not redirect routes to there functions.
