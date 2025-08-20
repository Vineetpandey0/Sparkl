import nodemailer from 'nodemailer'
import User from '@/models/user.models'
import bcrypt from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId='Nothing'}: any) => {
    try {
        let hashedToken = ''
        if(emailType === 'VERIFY') {
            //create a hash token
            hashedToken = await bcrypt.hash(userId.toString(),10)
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 ,
            })
        } else if ( emailType === 'RESET') {
            const userID = await User.findOne({ email }) 
            hashedToken = await bcrypt.hash(userID._id.toString(),10)
            console.log("User ID for reset:", userID._id, hashedToken)
            const user = await User.findByIdAndUpdate(userID._id, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 ,
            })
            console.log(user)
        }
        console.log("Hashed token:", hashedToken)
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "4bb111cbd270fe",
            pass: "390c5901de0e55"
        }
        });

        const mailOptions = {
            from: 'vineetpandey0010@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: emailType === 'VERIFY' ? `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
            or copy and paste the following link in your browser: <br>
            <a href="${process.env.domain}/verifyemail?token=${hashedToken}">${process.env.domain}/verifyemail?token=${hashedToken}</a>
            </p>` : `<p>Click <a href="${process.env.domain}/resetPassword?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
            or copy and paste the following link in your browser: <br>
            <a href="${process.env.domain}/resetPassword?token=${hashedToken}">${process.env.domain}/resetPassword?token=${hashedToken}</a>
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions)
        return mailresponse

    } catch (error:any) {
        throw new Error(error.message)
    }  
}