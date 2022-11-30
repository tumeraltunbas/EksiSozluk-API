const bcrypt = require("bcryptjs");

const inputValidation = (email, password) =>
{
    //We wrote a function that checks inputs.
    return (email && password) && (email != "" && password != "");
    //it checks "did input provide? and Are inputs blank?""
}

const comparePasswords = (password, hashed) =>
{
    //we gonna compare with user's password and provided password. User's password hashed, and the bcrypt will hash the provided password and compare these two password. CompareSync function will return a boolean therefore we can directly return it.
    return bcrypt.compareSync(password, hashed);
}


module.exports = {
    inputValidation,
    comparePasswords
}