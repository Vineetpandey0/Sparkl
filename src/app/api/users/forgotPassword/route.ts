import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.models";
import { sendEmail } from "@/helpers/mailer";

connect()
console.log("Forgot password API connected...")

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log ("Request body:", reqBody)
        const {email} = reqBody
        const response = await sendEmail({email, emailType: 'RESET'})
        console.log(response)
        return NextResponse.json({message: "Forgot password email sent successfully"}, {status: 200})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}