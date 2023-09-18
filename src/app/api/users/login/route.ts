import {connect} from "@/dbConfig/config";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;

        // check user exist or not
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({
                error: "User does not exist"
            }, {status: 400});
        }

        // check if password valid
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                error: "Invalid password"
            }, {status: 400});
        }

        // create token
        const tokenData = {
            id: user._id,
            email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});

        const res = NextResponse.json({
            message: "Login successful",
            success: true
        });
        res.cookies.set("token", token, {
            httpOnly: true,
        });

        return res;
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({
                error: e.message
            }, {status: 500});
        }
    }
}