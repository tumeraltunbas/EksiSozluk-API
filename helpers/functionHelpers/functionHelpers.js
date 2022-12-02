const User = require("../../models/User");
const CustomizedError = require("../error/CustomizedError");

const blockHelper = async(req, res, next, status) =>
{
    try
    {
        const {user_id} = req.params;
        const user = await User.findById(user_id);
        if(user.blocked == status)
        {
            const error = new CustomizedError(400, `User's block status already ${status}`);
            return next(error);
        }
        user.blocked = status;
        await user.save();
        res.status(200).json({success:true, message:`User's blocked status: ${user.blocked}`});
    }
    catch(err)
    {
        return next(err);
    }
}

const hide = async(model, res, next) =>
{
    try
    {
        if(model.isVisible == false)
        {
            const error = new CustomizedError(400, "This is already hid");
            return next(error);
        }
        model.isVisible = false;
        await model.save();
        res.status(200).json({success:true, message:"Hide process successfull"});
    }
    catch(err)
    {
        return next(err);
    }
}


module.exports = {
    blockHelper,
    hide
}