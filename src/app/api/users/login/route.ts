import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
        console.log("code is here......")
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        //check if the user exist 
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        if(user.isVerified === false) return NextResponse.json({error: "User isnt verified"}, {status: 411})

        //check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {httpOnly: true})

        return response

    } catch (error:unknown) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}