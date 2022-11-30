//We gonna write out error handler middleware here.
const CustomizedError = require("../../helpers/error/CustomizedError");

const errorHandler = (err, req, res, next) =>
{
    const error = new CustomizedError(400, err.message);
    res.status(error.statusCode||500).json({success:false, message:error.message});
}

module.exports = errorHandler;