const mongoose = require("mongoose");

const connectDb = () =>
{
    mongoose.connect(process.env.MONGO_URI).then(console.log("Database connection successfull")).catch(err => console.log(err));
    //mongoose.connect expects us a mongo uri to connect mongodb database. After, this function always returns a promise, as you remember; promise object returns successfull results in resolve, returns unsuccessfull results in reject. If our database connection successfull, we gonna show a message with then. If our database connection is unsuccessfull, we gonna show an error message with catch. We can catch successfull and unsuccessfull result in this way.
}

module.exports = connectDb;

//We cant run mongoose.connect() function in our main file without cover with a function, therefore we created a function and made a database connection in it. Thus, we can run connection in our main file.