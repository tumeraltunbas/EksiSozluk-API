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
        currentUser.followingCount +=1; //increase following count by one

        userToFollow.followers.push(req.user.id); //add user's id to followed user's followers
        userToFollow.followersCount +=1 //increase followers count by one

        await currentUser.save();
        await userToFollow.save();

        res.status(200).json({success:true, data:currentUser, message:"Follow process successfull"});
    }
    catch(err)
    {
        return next(err);
    }


    const {user_id} = req.params;
    const userToFollow = await User.findById(user_id);
    userToFollow.followers.push(req.user.id);
    userToFollow.followersCount +=1;
    await userToFollow.save();




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
        // currentUser.followingCount -=1;
    
        userToUnfollow.followers.splice(userToUnfollow.followers.indexOf(currentUser.id),1);
        // userToUnfollow.followersCount -=1;
    
        await currentUser.save();
        await userToUnfollow.save();
        res.status(200).json({success:true, data:currentUser, message:"Unfollow process successfull"});

    }
    catch(err)
    {
        return next(err);
    }
}

module.exports = {
    signUp,
    login,
    profile,
    logout,
    follow,
    unfollow
}
//we gonna use these functions in routes therefore we need to export this functions. If we dont export these functions, we can not redirect routes to there functions.
