"use client"
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Github, Instagram, Linkedin } from 'lucide-react'


function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (email.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [email])

    const sendVerificationMail = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/forgotPassword', { email })
            setLoading(false)
            toast.success("Check your email for the reset link")
        } catch (error) {
            console.error("Error sending forgot password email:", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='h-screen bg-black overflow-hidden font-helvetica'>
            <div className='flex flex-col items-center p-4 pr-8 pl-8 bg-black text-white '>
                <div className='flex w-full'>
                    <div className='text-5xl text-center --font-edu w-1/2 flex items-start '>Sparkl</div>
                    <div className='w-1/2 flex items-center justify-end gap-6  '>
                        <div className="flex gap-6 ">
                            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                                <Github className="w-8 h-8 text-white hover:text-gray-400" />
                            </a>
                            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-8 h-8 text-white hover:text-gray-400" />
                            </a>
                            <a href="https://instagram.com/vineetpandey00" target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-8 h-8 text-white hover:text-gray-400" />
                            </a>
                        </div>
                        <Button className='w-18 text-xl bg-purple-700 hover:bg-purple-800'>
                            <Link href="/login">Join</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex bg-black w-full h-full items-center flex-col '>


                <div className='flex w-3/4 m-10 justify-evenly items-center overflow-hidden object-contain '>


                    <Card className="w-3/4 h-4/5 max-w-sm flex justify-center shadow-xl text-white border-none rounded-3xl">
                        <CardHeader>
                            <h1 className=' text-center text-3xl m-4'>Reset your password</h1>
                        </CardHeader>

                        <CardContent>
                            <div>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            className='border-gray-400 focus-visible:ring-0'
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex-col gap-2">
                            <Button
                                type="submit"
                                className="w-full text-md cursor-pointer bg-purple-700"
                                onClick={sendVerificationMail}
                                disabled={buttonDisabled || loading}
                            >
                                {loading ? "Processing..." : "Reset Password"}
                            </Button>
                        </CardFooter>

                        <div className='flex justify-center items-center'>Already have an account?
                            <Link href="/login">
                                <Button variant="link" className='cursor-pointer text-purple-400 pl-2'>Login</Button>
                            </Link>
                        </div>
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

                    </Card>
                </div>


            </div>
        </div>
    )
}

export default ForgotPassword