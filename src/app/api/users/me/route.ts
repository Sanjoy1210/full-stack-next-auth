import {connect} from "@/dbConfig/config";
import {NextRequest, NextResponse} from "next/server";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({
                error: e.message
            }, {status: 400});
        }
    }
}