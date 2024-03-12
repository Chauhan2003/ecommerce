import nodemailer from 'nodemailer'

export const sendPasswordMail = async (id, token, email_to) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "mail.gmail.com",
        port: 465,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    var resetPasswordMsg = `
    <div style="background-color: #f8f8f8; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #5bc0de; text-align: center; font-family: 'Helvetica Neue', sans-serif;">Reset Your Password</h1>
        <p style="color: #333; font-size: 16px; text-align: center; line-height: 1.6;">
            We received a request to reset your password. Please click the link below to proceed.
        </p>
        <div style="text-align: center; margin-top: 20px;">
            <a href="http://localhost:3000/resetpassword/${id}/${token}" style="display: inline-block; padding: 12px 24px; background-color: #5bc0de; color: #fff; text-decoration: none; font-size: 18px; border-radius: 5px; cursor: pointer;">
                Reset Password
            </a>
        </div>
    </div>
`;


    try {
        var info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email_to,
            subject: "Reset Password Mail From Ecommerce App",
            html: resetPasswordMsg
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Sending Forget Password Mail'
        })
    }

    if (info.messageId)
        return true;
    else
        return false;
}