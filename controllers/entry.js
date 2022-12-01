const CustomizedError = require("../helpers/error/CustomizedError");
const Entry = require("../models/Entry");
const Title = require("../models/Title");
const User = require("../models/User");

const createEntry = async(req, res, next) =>
{
    //content, user, title
    try
    {
        const {slug} = req.params;
        const {content} = req.body;
        const title = await Title.findOne({slug:slug});
        const entry =  await Entry.create({content:content, user:req.user.id, title:title._id});
        res.status(200).json({success:true, data:entry});
    }
    catch(err)
    {
        return next(err);
    }
}


const likeEntry = async(req, res, next) =>
{
    try
    {
        const {entry_id} = req.params;
        const entry = await Entry.findById(entry_id);
        if(entry.likes.includes(req.user.id))
        {
            const error = new CustomizedError(400, "You already like this entry");
            return next(error);   
        }
        if(entry.dislikes.includes(req.user.id))
        {
            entry.dislikes.splice(entry.dislikes.indexOf(req.user.id),1);
        }
        entry.likes.push(req.user.id);
        entry.likeCount = entry.likes.length;
        entry.dislikeCount = entry.dislikes.length;
        await entry.save();
        res.status(200).json({success:true, data:entry, message:"You successfully liked this entry"});
    }
    catch(err)
    {
        return next(err);
    }
}


const dislikeEntry = async (req,res, next)=>
{
    try
    {
        const {entry_id} = req.params;
        const entry = await Entry.findById(entry_id);
        if(entry.dislikes.includes(req.user.id))
        {
            //user already disliked this entry
            const error = new CustomizedError(400, "You already disliked this entry");
            return next(error);
        }
        if(entry.likes.includes(req.user.id))
        {
            //user already liked this post
            entry.likes.splice(entry.likes.indexOf(req.user.id),1);
        }
        entry.dislikes.push(req.user.id);
        entry.likeCount = entry.likes.length;
        entry.dislikeCount = entry.dislikes.length;
        await entry.save();
        res.status(200).json({success:true, data:entry, message:"You successfully disliked this entry"});
    }
    catch(err)
    {
        return next(err);
    }
}

const undoLikeEntry = async (req, res, next) =>
{
    try
    {
        const {entry_id} = req.params;
        const entry = await Entry.findById(entry_id);
        if(!entry.likes.includes(req.user.id))
        {
            const error = new CustomizedError(400, "You already did not like this entry");
            return next(error);
        }
        entry.likes.splice(entry.likes.indexOf(req.user.id),1);
        entry.likeCount = entry.likes.length;
        await likes.save();
        res.status(200).json({success:true, data:entry, message:"Undo like is successfull"});
    }
    catch(err)
    {
        return next(err);
    }
}

const undoDislikeEntry = async(req, res, next) =>
{
    try
    {
        const {entry_id} = req.params;
        const entry = await Entry.findById(entry_id);
        if(!entry.dislikes.includes(req.user.id))
        {
            const error = new CustomizedError(400, "You already did not dislike this entry");
            return next(error);
        }
        entry.dislikes.splice(entry.dislikes.indexOf(req.user.id),1);
        entry.dislikeCount = entry.dislikes.length;
        await entry.save();
        res.status(200).json({success:true, data:entry, message:"Undo like is successfull"});
    }
    catch(err)
    {
        return next(err);
    }
}

const editEntry = async (req, res, next) =>
{
    try
    {
        const {entry_id} = req.params;
        const {content} = req.body;
        const entry = await Entry.findByIdAndUpdate(entry_id, {content:content}, {runValidators:true, new:true});
        res.status(200).json({success:true, data:entry, message:"Edit entry successfull"});
    }
    catch(err)
    {
        return next(err);
    }
}

const favoriteEntry = async(req, res, next) =>
{
    try
    {
        const {entry_id} = req.params;
        const user = await User.findById(req.user.id);
        if(user.favorites.includes(entry_id))
        {
            const error = new CustomizedError(400, "This entry already in your favorites");
            return next(err);
        }
        user.favorites.push(entry_id);
        await user.save();
        res.status(200).json({success:true, data:user, message:"Add to favorite successfull"});
    }
    catch(err)
    {
        return next(err);
    }
}

module.exports = {
    createEntry,
    likeEntry,
    dislikeEntry,
    undoLikeEntry,
    undoDislikeEntry,
    editEntry,
    favoriteEntry
}