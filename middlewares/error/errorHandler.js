//We gonna write out error handler middleware here.
const CustomizedError = require("../../helpers/error/CustomizedError");

const errorHandler = (err, req, res, next) =>
{
    let error = new CustomizedError(400, err.message);
    if(err.message.includes("jwt malformed"))
    {
        error = new CustomizedError(401, "Invalid token. You are not authorized to access this route.")
    }
    res.status(error.statusCode||500).json({success:false, message:error.message});
}

module.exports = errorHandler;

//Javascript can not catch errors in asynchronous processes. When occurs an error in synchronous process, our request gonna fall to an loop, our frontend application gonna try to send request again and again. Because for javascript can not catch errors in async processes, we can not show a message about error to user. We gonna write a error middleware function but this middleware function is special for error handling, therefore it gonna take a plus param called err. We gonna import it after the routers. Thus, when an error occurs we gonna pass it with next. It gonna fall to error middleware. Anymore we can show message about user.