const { visible, hide } = require("../helpers/functionHelpers/functionHelpers");
const Title = require("../models/Title");

const getTitle = async(req, res, next) =>
{
    try
    {
        //getting title with that slug
        const {slug} = req.params;
        const title = await Title.findOne({slug:slug, isVisible:true})
        .populate({path:"createdAt", select:"username"});
        res.status(200).json({success:true, data:title});
    }
    catch(err)
    {
        next(err);
    }
}


const hideTitle = async (req, res, next) =>
{
    try
    {
        const {slug} = req.params;
        const title = await Title.findOne({slug:slug});
        // console.log("burada");
        hide(title, res, next);
    }
    catch(err)
    {
        return next(err);
    }
}

const visibleTitle = async (req, res, next) =>
{
    try
    {
        const {slug} = req.params;
        const title = await Title.findOne({slug:slug});
        visible(title, res, next);
    }
    catch(err)
    {
        return next(err)
    }
}

module.exports = {
    getTitle,
    hideTitle,
    visibleTitle
}