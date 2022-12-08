const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    content: {
        type:String,
        required:[true, "You have to provide a content for entry"],
        minlength:[1, "You have to provide at least one character for entry"]
    },
    user: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: [true, "An entry must be added by an user"]
    },
    title:
    {
        type:mongoose.Schema.ObjectId,
        ref:"Title",
        required:[true, "An entry must contain a title information"]
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },
    likes: [
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
        }
    ],
    dislikes: [
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
        }
    ],
    likeCount:{
        type:Number,
        default:0
    },
    dislikeCount:{
        type:Number,
        default:0
    },
    lastEdited: {
        type:Date,
        default:null
    },
    isVisible: {
        type:Boolean,
        default:true
    },
    hidByAdmin: {
        type:Boolean,
        default:false
    }
});

const Entry = mongoose.model("Entry", EntrySchema);
//it creates a entries collection with EntrySchema

module.exports = Entry;