"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Github, Instagram, Linkedin } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ThemeModeToggle from '@/app/components/ThemeModeToggle'
import Footer from '@/app/components/footer'


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            toast.success("Login success...")
            router.push("/profile")
        } catch (error: any) {
            if (!error.response) {
                toast.error("Network error. Try again!");
            }

            const status = error.response.status;
            if (status === 400) {
                toast.error("Invalid password or user does not exist!");
            } else if (status === 411) {
                toast.error("User is not verified yet!");
            } else {
                toast.error("Something went wrong. Please try again.");
            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className='flex w-full items-center flex-col '>
            <div className="absolute right-8 top-5">
                <ThemeModeToggle />
            </div>
            <div className='flex w-3/4 mt-18 mb-6 justify-evenly items-center object-contain'>
                <div className="card_img group relative w-2/7">

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

                <Card className="w-2/5 h-full flex justify-center  border-none">

                    <CardHeader>
                        <h1 className='text-8xl text-center --font-edu font-bold '>Sparkl</h1>

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
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            href="/forgotPassword"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <Input
                                        className='border-gray-400 focus-visible:ring-0'
                                        placeholder='********'
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
                            className="w-full text-md cursor-pointer bg-purple-700"
                            onClick={onLogin}
                            disabled={buttonDisabled || loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </CardFooter>

                    <div className='flex justify-center items-center'>Don't have an account?
                        <Link href="/signup">
                            <Button variant="link" className='cursor-pointer text-purple-400 pl-2'>Sign Up</Button>
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