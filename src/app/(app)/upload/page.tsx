"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import ThemeModeToggle from '@/app/components/ThemeModeToggle'
import Link from 'next/link'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Heart, HomeIcon } from "lucide-react"
import Footer from '@/app/components/footer'



function Upload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(6)
  const [caption, setCaption] = useState("")
  const [isUploaded, setIsUploaded] = useState(false)
  const [posts, setPosts] = useState([])
  const [loadingPost, setLoadingPost] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const currentUsername = async () => {
      const response = await axios.get('/api/getUsername')
      setCurrentUser(response.data.data)
    }
    currentUsername()
  }, [])

  const uploadFile = async () => {

    if (!file) {
      toast.error("No file selected")
      return
    }

    try {
      setLoading(true)
      setProgress(0)

      const formData = new FormData()
      formData.append("postFile", file)
      formData.append("caption", caption)

      const response = await axios.post('/api/users/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total)
            setProgress(percent)
          }
        }
      })

      toast.success("File uploaded successfully")
      setIsUploaded(true)
      if (inputRef.current) inputRef.current.value = ""
      setFile(null)
      setCaption("")
    } catch (error: unknown) {
      console.error("Upload error:", error.message)
      toast.error("Error uploading file")
    } finally {
      setTimeout(() => setProgress(0), 1000) // Let user see 100% before reset
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/users/upload")
      const postData = response.data
      setPosts(postData)
    } catch (error: unknown) {
      console.error(error.message)
    } finally {
      setLoadingPost(false)
    }
  }

  useEffect(() => {
    setLoadingPost(true)
    fetchPosts()
  }, [])
  useEffect(() => {
    setPosts([])
    setLoadingPost(true)
    fetchPosts()
  }, [isUploaded])



  return (
    <div className='upload-page flex flex-col min-h-screen no-scrollbar overflow-y-auto'>
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 pb-6">
        <div className="text-5xl w-1/2 flex items-start font-bold --font-edu">Sparkl</div>
        <div className="w-1/2 flex items-center justify-end gap-6">
          <div className="flex gap-6 justify-center items-center">
            <Link href='/'>
              <HomeIcon className="w-8 h-8 hover:text-gray-400" />
            </Link>

            <ThemeModeToggle />
          </div>
          <Link href="/profile" className="size-12 rounded-full text-xl cursor-pointer ">
            <img src={currentUser.avatar} className="object-fill h-full w-full hover:opacity-65" />
          </Link>
        </div>
      </div>

      {/* Upload Card */}
      <div className='w-full p-4 flex items-center justify-center'>
        <Card className='w-1/2 border-none shadow-none flex flex-col items-center'>
          <CardHeader className='p-0 w-full text-center'>
            <h1 className='text-3xl font-bold'>Upload Images</h1>
          </CardHeader>

          <CardContent className='w-full flex flex-col items-center gap-4'>
            <Input
              ref={inputRef}
              type='file'
              accept="image/*"
              onChange={(e) => setFile(e.target?.files?.[0] || null)}
              className='border-2 h-10 cursor-pointer w-full'
            />
            <Input
              type='text'
              value={caption}
              placeholder='Write caption here'
              onChange={(e) => setCaption(e.target.value)}
              className='border-2 h-14 w-full' />

            {loading && (
              <div className='relative w-full flex flex-col items-center'>
                <Progress
                  value={progress}
                  className="w-3/4 h-10 rounded-xl bg-purple-700 [&>div]:bg-purple-900"
                />
                <p className='absolute text-white text-md top-1/5  '>{progress}%</p>
              </div>

            )}

            {!loading && <Button
              type="submit"
              className="text-md cursor-pointer h-10 hover:w-3/4 rounded-xl bg-purple-700 w-1/4 text-white"
              onClick={uploadFile}
              disabled={loading}
            >
              Upload
            </Button>}
          </CardContent>
        </Card>
      </div>

      <h1 className='text-3xl font-bold p-4'>My Posts</h1>
      <div className="w-full p-4">
        <div className="grid grid-cols-4 gap-0 relative ">
          {posts.map((post: unknown, index) => (
            <div key={index} className="relative border-2 border-white dark:border-black w-full h-[400px] shadow-3xl overflow-hidden flex items-center justify-center">
              <img
                src={post.postFile}
                alt={`post-${index}`}
                className="h-full object-cover hover:opacity-90  hover:scale-105 transition-transform duration-300"
              />
              <div className='text-white text-2xl absolute bottom-0 left-0 p-3 flex justify-center items-center gap-1'>
                <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                <p >{post.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loadingPost && (
        <h1 className='w-full text-center'>Loading...</h1>
      )}

      <Footer />

    </div>
  )
}

export default Upload
