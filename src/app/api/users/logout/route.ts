import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0) // expire immediately
        })
        return response
    } catch (error: unknown) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}