const mongoose = require("mongoose");
const slugify = require("slugify");
const Entry = require("./Entry");
const random = require("mongoose-simple-random");

const TitleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "You have to provide a name to title"],
        minlength:[1, "You have to provide at least one character for title"],
        unique:true
    },
    entries: [{
        type:mongoose.Schema.ObjectId,
        required:[true, "At least one entry is required to create a title"],
        ref:"Entry"
    }],
    entryCount: {
        type:Number,
        default:0
    },
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
        //if title did not change, continue without any process
        next();
    }
    this.slug = this.createSlug();
    //Before the saving title, we need to add a slug value
    next();
});

TitleSchema.methods.createSlug = function()
{
    //This function provides create slug.
    const slug = slugify(this.title, {replacement:"-", lower:true, locale:"TR"});
    return slug;
};


//We gonna change visibility of entries when a title visible or invisible
TitleSchema.pre("save", async function(next)
{
    if(this.isModified("isVisible"))
    {
        const entries = await Entry.find({title:this._id, hidByAdmin:false});
        for(var entry of entries)
        {
            entry.isVisible = this.isVisible;
            await entry.save();
        }
    }
    next();
});


TitleSchema.plugin(random);
const Title = mongoose.model("Title", TitleSchema);
//It creates a collection called titles with TitleSchema.

module.exports = Title;