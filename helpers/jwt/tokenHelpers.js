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

const isTokenIncluded = (req) =>
{
    //the token is in the request. we can reach to token with authorization key. {authorization:access_token}
    return req.headers.authorization;
}

const getToken = (req) =>
{
    //we gonna split the authorization value and get the access_token value
    return req.headers.authorization.split(" ")[1];
}

module.exports = {
    saveJwtToCookie,
    isTokenIncluded,
    getToken
}