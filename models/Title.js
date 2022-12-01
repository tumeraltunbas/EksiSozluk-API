const mongoose = require("mongoose");
const slugify = require("slugify");

const TitleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "You have to provide a name to title"],
        minlength:[1, "You have to provide at least one character for title"]
    },
    entries: [{
        type:mongoose.Schema.ObjectId,
        required:[true, "At least one entry is required to create a title"],
        ref:"User"
    }],
    followers: [
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    slug:
    {
        type:String,
    },
    createdBy: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true, "A title must be created by an user"]
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },
    isVisible: {
        type:Boolean,
        default:true
    }
});


TitleSchema.pre("save", async function(next)
{
    if(!this.isModified("title"))
    {
        next();
    }
    this.slug = this.createSlug();
    next();
});

TitleSchema.methods.createSlug = function()
{
    const slug = slugify(this.title, {replacement:"-", lower:true, locale:"TR"});
    return slug;
};

const Title = mongoose.model("Title", TitleSchema);
//It creates a collection called titles with TitleSchema.

module.exports = Title;