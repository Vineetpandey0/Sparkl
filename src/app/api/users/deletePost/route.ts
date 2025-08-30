import { connect } from "@/dbConfig/dbConfig";
import PostFile from "@/models/post.models";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function DELETE(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {postid} = reqBody
        const response = await PostFile.findByIdAndDelete(postid)
        console.log("successfully deleted")
        console.log(response)
        if (!response) {
            return NextResponse.json({ error: "Post not found" }, { status: 400 })
        }
        return NextResponse.json({data:response, success:true})
    } catch (error:unknown) {
        return NextResponse.json({error:error.message}, {status:502})
    }
}