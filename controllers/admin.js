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

const hideEntry = async (req, res, next) =>
{
    try
    {
        const {entry_id} = req.params;
        const entry = await Entry.findById(entry_id);
        hide(entry, res, next);
    }
    catch(err)
    {
        return next(err);
    }
}

const hideTitle = async (req, res, next) =>
{
    try
    {
        const {slug} = req.params;
        const title = await Title.findOne({slug:slug});
        hide(title, res, next);
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
    hideEntry,
    hideTitle
}