import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.models";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token, tokenType= 'verifyEmail'} = reqBody
        console.log(token)

        let user;
        if(tokenType === "verifyEmail") {
            user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        } else{
            user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        }

        if(!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }
        console.log(user)

        user.isVerified = true
        if (tokenType === "verifyEmail") {
            user.verifyToken = undefined
            user.verifyTokenExpiry = undefined
        } 
        await user.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
        
    } catch (error: unknown) {
        return NextResponse.json({error: error.message}, { status: 500 })
    }
}