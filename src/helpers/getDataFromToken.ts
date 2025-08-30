import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ''
        if(!token) throw new Error("User not logged in, NO TOKEN FOUND")
        const decodedToken:unknown = jwt.verify(token, process.env.TOKEN_SECRET)
        return decodedToken.id
    } catch (error:unknown) {
        throw new Error(error.message)
    }
}
