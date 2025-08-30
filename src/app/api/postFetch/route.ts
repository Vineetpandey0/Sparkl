import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import PostFile from "@/models/post.models";
import shuffle from "lodash.shuffle";
import User from "@/models/user.models";

connect();

export async function GET(request: NextRequest) {
  try {
    let postList = await PostFile.find({ isPublished: true }).select("-__v");

    // Convert to plain objects
    postList = JSON.parse(JSON.stringify(postList));

    // 1. Collect unique owner IDs
    const ownerIds = [...new Set(postList.map((post: any) => post.owner))];

    // 2. Fetch all users in one go
    const users = await User.find({ _id: { $in: ownerIds } }).select("username avatar");

    // 3. Create a lookup map { userId: { username, avatar } }
    const userMap: Record<string, any> = {};
    users.forEach((user: any) => {
      userMap[user._id.toString()] = {
        username: user.username,
        avatar: user.avatar,
      };
    });

    // 4. Append user details directly into each post (remove owner)
    postList = postList.map((post: any) => {
      const { username, avatar } = userMap[post.owner] || { username: null, avatar: null };
      const { owner, ...rest } = post; // remove owner
      return {
        ...rest,
        username,
        avatar,
      };
    });

    postList = shuffle(postList);

    return NextResponse.json(postList, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
