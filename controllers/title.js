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


module.exports = {
    getTitle,
}