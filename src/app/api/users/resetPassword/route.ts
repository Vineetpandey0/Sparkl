import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.models";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    const {token, newPassword} = reqBody

    const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

    if(!user) {
        return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
    }
    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save()
    console.log("Password reset successful for user:", user) 
    return NextResponse.json({success: true, message: "Password reset successfully"}, {status: 200})


}