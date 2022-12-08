const User = require("../../models/User")
const CustomizedError = require("../../helpers/error/CustomizedError");
const Title = require("../../models/Title");

const isUserExists = async (req,res, next) =>
{
    //We gonna check user right here. If the email that send by user is not exists we gonna turn a response to user with message.
    const value = req.body.email || req.params.user_id;
    const user = await User.findOne({email:value}) || await User.findById(value);
    if(user == null) // or (!user)
    {
        const err = new CustomizedError(400, "There is no account with that email");
        return next(err);
        //If we provide any param to next, it will perceive it as error. Because there are default params of middlewares. These params are req, res and next. But, we send to a forth param, therefore it skips controller automatically and fall it to errorHandler. If we add fourth param to our controller, it will pass to controller this time. 
    }
    return next();
    //If user is not null, pass to controller. We did not proide any param to next function, therefore it gonna pass to controller. But if we provided a param to it, it gonna pass to errorHandler.
}

const isTitleOpened = async(req, res, next)=>
{
    /*In eksisozluk to create a title, you have to create a entry in it. 
    We gonna check some things, if title is not opened, we gonna create a a title and add entry to it.*/

    const {q} = req.query;
    const title = await Title.findOne({title:q});
    const temp = (title == null);
    if(temp)
    {
        await Title.create({title:q,createdBy:req.user.id}); 
    }
    return next();

}

const isTitleExists = async(req, res, next) =>
{
    // If title is not exist, we gonna throw an error.
    const {slug} = req.params;
    const title = await Title.findOne({slug:slug});
    if(title==null)
    {
        const error = new CustomizedError(400, "There is no title like this");
        return next(error);   
    }
    next();
}


const isEntryExistsInTitle = async(req, res, next) =>
{
    //Is there entry in title
    const {slug, entry_id} = req.params;
    const title = await Title.findOne({slug:slug});
    if(!title.entries.includes(entry_id))
    {
        const error = new CustomizedError(400, "There is no entry in this title");
        return next(error);
    }
    next();
}

module.exports = {
    isUserExists,
    isTitleOpened,
    isTitleExists,
    isEntryExistsInTitle
}