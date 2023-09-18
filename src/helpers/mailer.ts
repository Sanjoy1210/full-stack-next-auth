import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            );
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            );
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: "sanjoypp@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>
                    Click <a href="${process.env.BASE_URL}/verify?t=${hashedToken}">here</a> to
                    ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                    or copy and paste the link below in your browser. <br> 
                    ${process.env.BASE_URL}/verify?t=${hashedToken}
                </p>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
}