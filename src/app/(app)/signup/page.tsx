"use client"
import Link from "next/link"
import axios from "axios"
import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Github, Instagram, Linkedin } from 'lucide-react'


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Footer from "@/app/components/footer"
import ThemeModeToggle from "@/app/components/ThemeModeToggle"


export default function SignUpPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        fullname: "",
        avatar: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            toast.success("Check your email for verification link...", { duration: 5000 })
            router.push("/login")
        } catch (error: unknown) {
            console.log("Signup failed", error.message)
            if (error.status === 400) {
                toast.error("User already exists")
            } else {
                toast.error("Signup failed, please try again")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0 && user.fullname.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className='flex w-full mt-2 items-center flex-col '>
            <div className="absolute right-8 top-5">
                <ThemeModeToggle />
            </div>
            <div className='flex w-3/4 m-10 gap-8 h-full justify-evenly items-center object-contain'>


                <div className="card_img group relative w-2/7 ">

                    {/* Back card 1 */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden transform rotate-6 translate-x-3 translate-y-3 transition duration-500 group-hover:rotate-2 group-hover:translate-x-1 group-hover:translate-y-1">
                        <img
                            src="/images/sideImage.jpg"
                            alt="Background 1"
                            className="w-full h-full object-cover grayscale opacity-60"
                        />
                    </div>

                    {/* Back card 2 */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden transform rotate-12 translate-x-6 translate-y-6 transition duration-500 group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2">
                        <img
                            src="/images/sideImage.jpg"
                            alt="Background 2"
                            className="w-full h-full object-cover grayscale opacity-40"
                        />
                    </div>

                    {/* Main card */}
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg transform -rotate-6 transition duration-500 group-hover:rotate-0 group-hover:-translate-y-2 group-hover:shadow-2xl">
                        <img
                            src="/images/sideImage.jpg"
                            alt="Main Image"
                            className="w-full h-full object-cover transition duration-500 hover:sepia"
                        />
                    </div>
                </div>

                <Card className="w-2/5 h-full  flex justify-center  border-none">

                    <CardHeader>
                        <h1 className='text-8xl text-center --font-edu font-bold'>Sparkl</h1>

                    </CardHeader>

                    <CardContent>
                        <div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="fullname">Full Name</Label>
                                    <Input
                                        className='border-gray-400 focus-visible:ring-0'
                                        id="fullname"
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        className='border-gray-400 focus-visible:ring-0'
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        required
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        className='border-gray-400 focus-visible:ring-0'
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>

                                    </div>
                                    <Input
                                        className='border-gray-400 focus-visible:ring-0'
                                        placeholder='Use a strong password'
                                        id="password"
                                        type="password"
                                        required
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                </div>



                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full text-md cursor-pointer bg-purple-700 "
                            onClick={onSignup}
                            disabled={buttonDisabled || loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </CardFooter>

                    <div className='flex justify-center items-center'>Already have an account?
                        <Link href="/login">
                            <Button variant="link" className='cursor-pointer text-purple-400 pl-2'>Login</Button>
                        </Link>
                    </div>
                    <div className="flex gap-6 justify-center ">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 hover:opacity-60" />
                        </a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-5 h-5 hover:opacity-60" />
                        </a>
                        <a href="https://instagram.com/vineetpandey00" target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-5 h-5 hover:opacity-60" />
                        </a>
                    </div>

                </Card>
            </div>
            <Footer />
        </div>
    )
}