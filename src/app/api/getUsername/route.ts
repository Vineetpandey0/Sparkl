import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ''
        if(!token) throw new Error("User not logged in, NO TOKEN FOUND")
        const decodedToken:unknown = jwt.verify(token, process.env.TOKEN_SECRET)
        return NextResponse.json({data: decodedToken}, {status: 200})
    } catch (error:unknown) {
        return NextResponse.json({error:error.message}, {status: 400})

    }
}