"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Github, Instagram, Linkedin } from 'lucide-react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

function resetPassword() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const tokenType = 'resetToken'
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  //verify user token
  const verifyUserEmail = async () => {
    try {
      setLoading(true)
      await axios.post('/api/users/verifyemail', { token, tokenType })
      setVerified(true)
      console.log("Verification successful")
    } catch (error: any) {
      setLoading(false)
      setError(true)
      console.log("Verification failed", error.message)
      console.log(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  //reset user password
  const resetPassword = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/resetPassword', { token, newPassword })
      if (response.data.success) {
        toast.success("Password reset successfully")
        console.log("Password reset successful")
        router.push("/login")
      } else {
        toast.error("Failed to reset password")
        console.log("Password reset failed")
      }
    } catch (error: any) {
      console.error("Error resetting password:", error.message)
      toast.error("Failed to reset password....")
    } finally {
      setLoading(false)
      setNewPassword("")
      setToken("")
      setVerified(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  useEffect(() => {
    if (newPassword.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  })
  return (

    <div className='flex w-full h-lvh items-center flex-col bg-black'>
      <div className='flex w-3/4 m-10 h-full justify-evenly items-center overflow-hidden object-contain'>


        <Card className="w-1/2 h-full max-w-sm flex justify-center shadow-xl text-white border-none">

          <CardHeader>
            <h1 className='text-8xl text-center --font-edu '>Sparkl</h1>

          </CardHeader>

          <CardContent>
            <div>
              {verified && (
                <div className="flex flex-col gap-6">

                  <div className="grid gap-2">

                    <Input
                      className='border-gray-400 focus-visible:ring-0'
                      placeholder='********'
                      id="password"
                      type="password"
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            {verified && (
              <Button
                type="submit"
                className="w-full text-md cursor-pointer bg-purple-700"
                onClick={resetPassword}
                disabled={buttonDisabled || loading}
              >
                {loading ? "Setting password..." : "Set password"}
              </Button>
            )}
          </CardFooter>


          <div className="flex gap-6 justify-center ">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 text-white hover:text-gray-400" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-white hover:text-gray-400" />
            </a>
            <a href="https://instagram.com/vineetpandey00" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-white hover:text-gray-400" />
            </a>
          </div>

          {error && (
            <div>
              <h2 className="text-red-500">Something went wrong....Try again...!!!</h2>
            </div>
          )}
        </Card>
      </div>


    </div>

  )
}

export default resetPassword