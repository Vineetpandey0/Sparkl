import { connect } from "@/dbConfig/dbConfig";
import PostFile from "@/models/post.models";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    const reqBody = await request.json()
    const {username, task} = reqBody
    // if(username === userName) return NextResponse.json({message: "User is admin"}, {status: 418})
    if (task === 'fetchUserData') {
        try {
            const user = await User.findOne({username}).select("-password")
            console.log(user)
            return NextResponse.json({message: "User found", data: user, success: true})
        } catch (error:unknown) {
            return NextResponse.json({error: error.message, success: false}, {status: 400})
        }
    } else {
        try {
            const userID = await User.findOne({username}).select("_id")
            const postList = await PostFile.find({isPublished:true , owner:userID }).select('-__v').sort({createdAt: -1})
            return NextResponse.json(postList, {status: 200})
        } catch (error:unknown) {
            return NextResponse.json({message: error.message}, {status: 500})
        }
        
    }
}