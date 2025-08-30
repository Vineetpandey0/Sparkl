import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/user.models.js'
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password, fullname} = reqBody

        console.log(reqBody)

        //check if the user already exist
        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        console.log("User does not exist, proceeding with signup...")
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            fullname,
            password: hashedPassword
        })
        console.log("New user created:", newUser)

        const savedUser = await newUser.save()
        console.log(savedUser)
        console.log("User saved successfully")

        //sending verification email
        await sendEmail({email, emailType: 'VERIFY', userId:savedUser._id})
        
        return NextResponse.json({message: "User created successfully", success: true, savedUser} )

    } catch (error:unknown) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}