"use client"
import React, { useState, useEffect } from "react"
import { Github, Instagram, Linkedin, UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ThemeModeToggle from "./components/ThemeModeToggle"
import PostFetch from "./components/postFetch"
import axios from "axios"
import Footer from "./components/footer"
import { Loader } from "lucide-react"   // 👈 loader icon

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(true)   // 👈 loader for initial fetch

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get('/api/users/profile')
      if (response.data.success) {
        setIsLoggedIn(true)
        setCurrentUser(response.data.data)
      }
    } catch (err) {
      console.error("Error fetching profile", err)
    } finally {
      setLoading(false)   // 👈 stop loader
    }
  }

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className=" flex items-center justify-between px-6 py-4">
        <div className="text-5xl w-1/2 flex items-start --font-edu font-bold">Sparkl</div>
        <div className="w-1/2 flex items-center justify-end gap-6">
          <div className="flex gap-6 justify-center items-center">
            <Link href='/upload' title="Upload">
              <UploadIcon className="w-8 h-8 hover:text-gray-400" />
            </Link>
            <ThemeModeToggle />
          </div>

          {loading ? (
            <div className="size-12 flex items-center justify-center">
              <Loader className="animate-spin w-6 h-6 text-gray-500" />
            </div>
          ) : !isLoggedIn ? (
            <Button className="w-20 h-12 rounded-xl text-xl text-white bg-purple-700 hover:bg-purple-800">
              <Link href="/login" className="w-full h-full">Join</Link>
            </Button>
          ) : (
            <Link href="/profile" className="size-12 rounded-full text-xl overflow-hidden cursor-pointer">
              <img src={currentUser?.avatar || "./images/profile_logo.png"} className="object-cover h-full w-full hover:opacity-65" />
            </Link>
          )}
        </div>
      </div>

      {/* Galleries */}
      <div className="flex-1 no-scrollbar">
        <PostFetch />   {/* 👈 posts should have their own loader inside PostFetch */}
      </div>

      <Footer />
    </div>
  )
}

export default Page
