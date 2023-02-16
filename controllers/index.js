const Title = require("../models/Title");

const index = async (req, res, next) =>
{
    const daily = await Title.find({isVisible:true, createdAt:new Date().toDateString()});
    Title.findRandom({isVisible:true}, {}, {limit:10},function(err, randomTitles)
    {
        if(err) return next(err);
        else{
            res.status(200).json({success:true, data:randomTitles, daily:daily});
        }
    });
}


module.exports = {
    index
}