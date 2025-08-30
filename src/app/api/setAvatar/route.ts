import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/user.models'
import PostFile from '@/models/post.models'
import mongoose from 'mongoose'

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

        const user =  await User.findByIdAndUpdate(userID,
            {avatar: imageUrl}
        )
        return NextResponse.json({ imageUrl }, { status: 200 })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 418})
    }

  } catch (error) {
    console.error('Upload image failed:', error)
    return NextResponse.json({ error: 'Upload image failed' }, { status: 500 })
  }
}

