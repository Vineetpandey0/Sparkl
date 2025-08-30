import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/user.models'
import PostFile from '@/models/post.models'

connect()

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface CloudinaryUploadResult {
  public_id: string
  [key: string]: any
}


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('postFile') as File | null

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'next-cloudinary-uploads' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as CloudinaryUploadResult)
        }
      )
      uploadStream.end(buffer)
    })
    const imageUrl = result.secure_url;

    // Get user ID from token
    const userID = await getDataFromToken(request)
    try {

        const newPostFile = new PostFile({
            postFile: imageUrl.toString(),
            owner: userID,
            caption: formData.get('caption')?.toString(),

        })
        console.log("New user created:", newPostFile)
        const savedPostFile = await newPostFile.save()
        console.log("Post file saved successfully", savedPostFile)

        const user =  await User.findById(savedPostFile.owner.toString())
        console.log("User who published this:", user)
        return NextResponse.json({ publicId: result.public_id }, { status: 200 })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 418})
    }

  } catch (error) {
    console.error('Upload image failed:', error)
    return NextResponse.json({ error: 'Upload image failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Get user ID from token
  const userID = await getDataFromToken(request)
  console.log("get request was reached....", userID)
  try {
      const postList = await PostFile.find({isPublished:true , owner:userID }).select('-__v').sort({createdAt: -1})
      console.log(postList)
      
      return NextResponse.json(postList, {status: 200})
  } catch (error:any) {
      return NextResponse.json({message: error.message}, {status: 500})
  }
}