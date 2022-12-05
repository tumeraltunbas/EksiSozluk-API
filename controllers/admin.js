const CustomizedError = require("../helpers/error/CustomizedError");
const { blockHelper, hide } = require("../helpers/functionHelpers/functionHelpers");
const Entry = require("../models/Entry");
const Title = require("../models/Title");
const User = require("../models/User")

const getAllUsers = async(req, res, next) =>
{
    try
    {
        const users = await User.find();
        res.status(200).json({success:true, data:users});
    }
    catch(err)
    {
        return next(err);
    }
}

const blockUser = async (req, res, next) =>
{
    blockHelper(req, res, next, true);
}

const unblockUser = async(req, res, next) =>
{
    blockHelper(req, res, next, false);
}

const getAllTitles = async (req, res, next) =>
{
    try
    {
        const titles = await Title.find({isVisible:true})
        .populate({path:"createdBy", select:"username"})
        .populate({path:"entries", select:"content"});
        res.status(200).json({success:true, data:titles});
    }
    catch(err)
    {
        return next(err);
    }
}



module.exports = {
    getAllUsers,
    blockUser,
    unblockUser,
    getAllTitles
}