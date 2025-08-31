import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import User from "@/models/user.models"

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ''
        if(!token) throw new Error("User not logged in, NO TOKEN FOUND")
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decodedToken.id)
        return NextResponse.json({data: user}, {status: 200})
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 400})

    }
}