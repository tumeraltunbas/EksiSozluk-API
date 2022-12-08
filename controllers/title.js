const { visible, hide } = require("../helpers/functionHelpers/functionHelpers");
const Title = require("../models/Title");


const searchTitle = async (req, res, next) =>
{
    try
    {
        const {q} = req.query;
        const title = await Title.findOne({title:q});
        res.status(200).json({success:true, data:title});   
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
        console.log(slug);
        const title = await Title.findOne({slug:slug});
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

const followTitle = async (req, res, next) =>
{
    try
    {
        const {slug} = req.params;
        const title = await Title.findOne({slug:slug});
        title.followers.push(req.user.id);
        await title.save();
        res.status(200).json({success:true, message:"Title following successfull"});
    }
    catch(err)
    {
        return next(err);
    }
}

module.exports = {
    // getTitle,
    hideTitle,
    visibleTitle,
    searchTitle,
    followTitle
}