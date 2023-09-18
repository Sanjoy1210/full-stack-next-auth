import {connect} from "@/dbConfig/config";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { firstName, lastName, email, password } = reqBody;

        // check if user already exists
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({
                error: "User already exists"
            }, {status: 400});
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // send verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return NextResponse.json({
                error: e.message,
            }, {status: 500});
        }
    }
}