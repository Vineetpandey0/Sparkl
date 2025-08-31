import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post.models";
import Like from "@/models/like.models";
import { NextRequest, NextResponse } from "next/server";
import PostFile from "@/models/post.models";

connect();

export async function POST(request: NextRequest) {
  try {
    const { postid, userid, liked,like } = await request.json();

    const post = await Post.findById(postid);

    let likeDoc = await Like.findOne({ post: postid });
    if(!likeDoc) {
        const newLikeModel = new Like({
                post: postid,
                likedBy: {user:userid, liked}
            })
            console.log("New user created:", newLikeModel)
            likeDoc = await newLikeModel.save()
    }

    const existingIndex = likeDoc.likedBy.findIndex(obj => obj.user.toString() === userid);

    if (liked) {
      if (existingIndex === -1) {
        likeDoc.likedBy.push({ user: userid, liked: true });
      } else {
        likeDoc.likedBy[existingIndex].liked = true;
      }
    } else {
      if (existingIndex !== -1) {
        likeDoc.likedBy[existingIndex].liked = false;
      }
    }
    

    await likeDoc.save();
    console.log(like)
    const postResponse = await PostFile.findByIdAndUpdate(postid, {views: like});
    console.log(postResponse)

    return NextResponse.json({
      message: "Like updated successfully",
      data: {
        alreadyLiked: likeDoc.likedBy[existingIndex].liked,
        postResponse
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Like update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request:NextRequest) {
    try {
        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        const { searchParams } = new URL(request.url)
        const postid = searchParams.get('postid')
        const userid = searchParams.get('userid')
        console.log(postid, userid)

        let likeList = await Like.findOne({post: postid})
        if(!likeList) {
        const newLikeModel = new Like({
                post: postid,
                likedBy: {user:userid, liked:false}
            })
            console.log("New user created:", newLikeModel)
            likeList = await newLikeModel.save()
        }

        const userObj = likeList.likedBy.find(obj => obj.user.toString() === userid);
        const isLiked = userObj.liked || false
        return NextResponse.json({data:isLiked}, {status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message} ,{status:501})
    }
}