const mongoose = require("mongoose");
const bcrypt = require("bcryptjs") //importing bcryptjs library for password hashing
const jsonwebtoken = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({ //UserSchema is new mongoose.Schema
    username:{
        type:String,
        required:[true, "You have to provide a username"],
        unique:true,
        minlength:[2, "Username must be longer than two characters"]
    },
    email:{
        type:String,
        required:[true, "You have to provide a email"],
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:
    {
        type:String,
        required:[true, "You have to provide a password"],
        minlength:[8, "Password must be longer than eight characters"],
        select:false
    },
    birthDate: {
        type:Date,
        required:[true,"You have to provide a birth date"]
    },
    gender: {
        type:Boolean,
        required:[true, "You have to provide a gender option"],
    },
    role: {
        type:String,
        enum: ["user", "admin"],
        default:"user"
    },
    following:[{
        type:mongoose.Schema.ObjectId,
        ref:"user",
    }],
    followers:[{
        type:mongoose.Schema.ObjectId,
        ref:"user",
    }],
    followingCount: {
        type:Number,
        default:0
    },
    followersCount: {
        type:Number,
        default:0
    },
    favorites: [{
        type:mongoose.Schema.ObjectId,
        ref:"Entry"
    }],
    profilePicture: {
        type:String,
        default:"default.png"
    },
    about: {
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    blocked: {
        type:Boolean,
        default:false
    }
});

//There is hooks, these hooks run either before a process or run after a process. We gonna hash password before the save process, therefore we gonna use pre hooks. Pre hooks means "before the save process"

UserSchema.pre("save", function(next)
{
    if(!this.isModified("password"))
    {
        //If user updated but password did not changed, no need to password hash again, because password already hashed.
        next(); //continue to saving process.
    }
    //If password is changed, we gonna hash password with bcrypt.
    const salt = bcrypt.genSaltSync(10); //we created a salt for password hashing.
    //The salt appends to beginning of the hash for increasing security.
    const hashedPassword = bcrypt.hashSync(this.password, salt); //we hashed the user's password.
    this.password = hashedPassword; //we changed user's password with hashedPassword.
    next(); //continue to saving process
});

UserSchema.methods.createJwt = (payload) => //there are some method belong to schemas. But we can write new methods here.
{
    //We gonna write a function that gonna create a jwt
    /*
    To create JWT, we need to follow some steps
    1- Create Payload
    2- Secret Key
    3- JWT Expires
    */
    const {JWT_SECRET,JWT_EXPIRES} = process.env;
    const accessToken = jsonwebtoken.sign(payload, JWT_SECRET, {expiresIn:JWT_EXPIRES});
    return accessToken; //we need to return accessToken because we gonna save this token value to cookie.
}

UserSchema.methods.createPayload = function()
{
    //The payload contains some information about user. This payload makes all jwts unique. Each user informations are different. Thus each jwt will be different.
    const payload = {
        id:this._id,
        username:this.username
    }
    return payload;
}

// UserSchema.pre("save", async function(next)
// {
//     const user = await User.findById(req.user.id);

// });


//mongoose.model() is used to create a collection with provided name and schema. This function returns a mongoose object.
const User = mongoose.model("User", UserSchema);
module.exports = User;
