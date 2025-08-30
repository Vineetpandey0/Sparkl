import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest){
    try {
        const userID = await getDataFromToken(request)
        const user = await User.findOne({_id: userID}).select("-password")
        return NextResponse.json({message: "User found", data: user, success: true})
    } catch (error:unknown) {
        return NextResponse.json({error: error.message, success: false}, {status: 400})
    }
}