const saveJwtToCookie = (user,res) =>
{
    const {COOKIE_EXPIRES, NODE_ENV} = process.env; //taking variable and values from config file.
    const payload = user.createPayload(); //creating payload
    const token = user.createJwt(payload);  //creating jsonwebtoken with provided payload,
    res.status(200)
    .cookie("access_token", token, { //res.cookie() is used for setting the value to cookie
        httpOnly:true,  //only used by the webserver
        // expires: Date.now() + parseInt(COOKIE_EXPIRES), //Expires date of cookie
        maxAge: 86400, //the value will expire after 86400 milliseconds.
        secure:NODE_ENV == "development" ? false : true //this marks the cookie to be used only with https
    })
    .json({success:true, data:user, access_token:token})
}



module.exports = {
    saveJwtToCookie
}