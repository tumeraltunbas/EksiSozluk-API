//Javascript's default error object has no statusCode property. We gonna write a new Error class and add it to statusCode property. Thus, we will send status code in response. Status codes speficies requests successfull or not.

class CustomizedError extends Error //Our CustomError will inherited from JS default error object. We will just add it to statusCode.
{
    constructor(statusCode, message)
    {
        super(message); //we will Error class's message feature
        this.statusCode = statusCode;
    }
}

//We gonna export this CustomizedError to reach from anywhere.
module.exports = CustomizedError;