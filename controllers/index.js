const Title = require("../models/Title");

const index = async (req, res, next) =>
{
    Title.findRandom({isVisible:true}, {}, {limit:10},function(err, randomTitles)
    {
        if(err) return next(err);
        else{
            res.status(200).json({success:true, data:randomTitles});
        }
    });
}


module.exports = {
    index
}