const Title = require("../models/Title");

const getTitle = async(req, res, next) =>
{
    try
    {
        const {slug} = req.params;
        const title = await Title.findOne({slug:slug})
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