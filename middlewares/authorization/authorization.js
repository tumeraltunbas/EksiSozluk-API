//Now, we gonna authorization process.
const jsonwebtoken = require("jsonwebtoken");
const CustomizedError = require("../../helpers/error/CustomizedError");
const { isTokenIncluded, getToken } = require("../../helpers/jwt/tokenHelpers");
const Entry = require("../../models/Entry");

const getAccessToRoute = (req, res, next) =>
{
    const {JWT_SECRET} = process.env;
    //Before the authorization check, we need to check something.
    if(isTokenIncluded(req)==undefined)
    {
        //If token is not included pass error to errorHandler.
        const error = new CustomizedError(400, "Token is not provided");
        next(error);
    }
    const token = getToken(req); 
    const decoded = jsonwebtoken.verify(token, JWT_SECRET); //verifying token.
    req.user = {
        id:decoded.id,
        username:decoded.username
    };
    //we added current user to req.user because we gonna need to user under request.
    next();
}

const getEntryOwnerAccess = async (req, res, next) =>
{
    const {entry_id} = req.params;
    const entry = await Entry.findById(entry_id);
    if(entry.user != req.user.id)
    {
        const error = new CustomizedError(403, "You are not the owner of entry");
        return next(error);
    }
    next();
}

module.exports = {
    getAccessToRoute,
    getEntryOwnerAccess
}