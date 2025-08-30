import { connect } from "@/dbConfig/dbConfig";
import PostFile from "@/models/post.models";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        console.log("code reached........1....")
        const reqBody = await request.json()
        console.log(reqBody)
        const {postid} = reqBody
        console.log(postid, reqBody)
        console.log("code is here..............")
        const post = await PostFile.findById(postid)
        console.log(post)
        return NextResponse.json({message:"Post request succesfull", success:true, data:post})
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 501})
    }
}