const nodemailer = require("nodemailer");

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD} = process.env;
const mailsender = (mailOptions) =>
{
    const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user:SMTP_USER,
            pass:SMTP_PASSWORD
        }
    });
    
    transport.sendMail(mailOptions);
    
}

const createMailConfig = (email, subject, html) =>
{
    const mailOptions = {
        from: SMTP_USER,
        to: email,
        subject: subject,
        html: html
    }
    return mailOptions;
}


//If we leave this code like this, we will not run this code. We gonna cover it with a function therefore when we export and use it somewhere we can run this code.

module.exports = 
{
    mailsender,
    createMailConfig
}