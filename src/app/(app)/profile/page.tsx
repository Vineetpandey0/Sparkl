"use client"
import React, { useEffect, useState } from "react"
import { UploadIcon, HomeIcon, Camera, Loader, LoaderCircleIcon, Loader2 } from "lucide-react"
import ThemeModeToggle from "@/app/components/ThemeModeToggle"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import PostView from "@/app/components/singlePost"
import Footer from "@/app/components/footer"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface UserProfile {
    _id?: string
    username: string
    fullname: string
    email: string
    avatar: string
    isAdmin?: boolean
    isVerified: boolean
}


export default function Profile() {
    const [postClicked, setPostClicked] = useState(false)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loadingPost, setLoadingPost] = useState(false)
    const [loadingUserDetails, setLoadingUserDetails] = useState(true)
    const [postid, setPostid] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [isAvatarUpdated, setIsAvatarUpdated] = useState(false)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

    const router = useRouter()

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

    const logout = () => {
        try {
            const response = axios.get('/api/users/logout')
            toast.success('Logout successfull')
            router.push('/login')

        } catch (error: unknown) {
            console.log(error.message)
            toast.error('logout unsuccessfull')
        }
    }

    const optimizeCloudinaryUrl = (url: string) => {
        return url.replace('/upload/', '/upload/w_300,h_300,c_fill,q_auto,f_auto/');
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users/profile')
            const user_ = response.data.data
            setUser(user_)

        } catch (error: unknown) {
            console.error(error.message)
            logout()
        } finally {
            setLoadingUserDetails(false)
        }
    }

    const setAvatar = async () => {
        setIsUploadingAvatar(true)
        try {
            const formData = new FormData()
            formData.append("postFile", file)

            const response = await axios.post('/api/setAvatar', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            setIsAvatarUpdated(true)
            toast.success("Profile Pic set successfully")
            setFile(null)
        } catch (error: unknown) {
            console.error(error.message)
            toast.error("Error updating profile pic")

        } finally {
            setIsUploadingAvatar(false)
        }
    }

    useEffect(() => {
        if (!file) return
        setAvatar()
    }, [file])


    useEffect(() => {
        setPostClicked(false)
        setLoadingPost(true)
        fetchUserData()
        fetchPosts()
    }, [])

    useEffect(() => {
        fetchUserData()
        setIsAvatarUpdated(false)
    }, [isAvatarUpdated])


    return (
        <div className="flex flex-col min-h-screen w-full ">
            {/* Navbar */}
            <div className="flex items-center justify-between px-6 py-4 pb-6">
                <div className="text-5xl  w-1/2 flex items-start font-bold --font-edu"><Link href='/'>Sparkl</Link></div>
                <div className="w-1/2 flex items-center justify-end gap-6">
                    <div className="flex gap-6 justify-center items-center">
                        <Link href='/' title="Home">
                            <HomeIcon className="w-8 h-8 hover:text-gray-400" />
                        </Link>
                        <Link href='/upload' title="Upload">
                            <UploadIcon className="w-8 h-8 hover:text-gray-400" />
                        </Link>

                        <ThemeModeToggle />
                    </div>
                    <Link href={`/profile/${user?.username}`} className="relative size-12 flex items-center justify-center overflow-hidden rounded-full text-xl cursor-pointer ">
                        {!loadingUserDetails && 
                            <Image alt="avatarlogo" 
                                src={user?.avatar} 
                                className="object-cover  hover:opacity-65" 
                                fill/>}
                        {loadingUserDetails && <Loader className="animate-spin w-6 h-6 text-gray-500" />
                        }
                    </Link>
                </div>
            </div>

            <h1 className="text-3xl pl-6 font-bold">{postClicked ? "Post" : ""}</h1>

            <div className=" flex p-6 w-full gap-6">
                {
                    <div className={`profile-card post-card flex flex-col gap-6 ${postClicked ? "w-2/3" : "w-3/6"} `}>
                        {postClicked &&
                            <PostView postid={postid} username={user!.username} avatarUrl={user?.avatar} isAdmin={true} userid={user._id} />}

                        <h1 className="text-3xl pl-6 font-bold">My Profile</h1>

                        {!loadingUserDetails &&
                            <div className="flex p-2 w-full gap-6 shadow-xl">
                                {isUploadingAvatar &&
                                    <div className="avatar-circle size-36 rounded-full overflow-hidden flex items-center justify-center group relative ">
                                        <Loader className="animate-spin w-6 h-6 text-gray-500" />
                                    </div>

                                }
                                {!isUploadingAvatar &&
                                    <div className="avatar-circle size-36 rounded-full overflow-hidden flex items-center justify-center group relative">
                                        <Image 
                                            alt="User Profile pic"
                                            src={user?.avatar} className="object-cover group-hover:opacity-40" fill/>
                                        <Camera
                                            className="absolute hidden size-1/2 group-hover:block object-contain opacity-45 " />
                                        <Input
                                            type="file"
                                            accept="img/*"
                                            onChange={(e) => setFile(e.target?.files?.[0] || null)}
                                            className="file:text-transparent text-transparent rounded-full h-full w-full  hidden cursor-pointer group-hover:block absolute"
                                        />
                                    </div>}
                                <div className="flex flex-col h-full  items-start pt-0 p-6 ">
                                    <h1 className="username text-3xl font-bold pb-2">@{user?.username}</h1>
                                    <h2 className="fullname text-xl text-gray-500">{user?.fullname}</h2>
                                    <Button
                                        onClick={logout}
                                        className="p-0 text-md text-red-600 cursor-pointer hover:underline"
                                    >Logout</Button>
                                </div>
                            </div>}
                        {loadingUserDetails &&
                            <div className="flex p-2 w-full h-fit gap-6 shadow-xl">
                                <Skeleton className="size-36 rounded-full bg-red-400" />
                                <div className="space-y-2 flex flex-col h-full items-start pt-2 p-6">
                                    <Skeleton className="h-6 w-[250px] bg-gray-500" />
                                    <Skeleton className="h-6 w-[200px] bg-gray-500" />
                                </div>
                            </div>}
                    </div>}


                <div className="w-2/3 h-screen ">
                    <h1 className='text-3xl font-bold p-2 pl-4'>My Posts</h1>

                    <div className="w-full p-4 max-h-full overflow-scroll no-scrollbar">
                        {!loadingPost && posts.length === 0 && <p className="text-center text-lg">No posts to show.</p>}

                        <div className="grid grid-cols-4 gap-0 relative ">
                            {posts.map((post: unknown, index) => (
                                <div key={index} className="relative border-2 dark:border-black border-white  w-full aspect-square shadow-3xl overflow-hidden flex items-center justify-center">

                                    <Image
                                        src={optimizeCloudinaryUrl(post.postFile)}
                                        alt={`post-${index}`}
                                        loading="lazy"
                                        onClick={() => {
                                            setPostid(post._id)
                                            setPostClicked(true)
                                        }}
                                        className="h-full object-cover hover:opacity-80  hover:scale-105 transition-transform duration-300"
                                        fill
                                    />
                                    {!postClicked && <div className='text-white text-2xl absolute bottom-0 left-0 p-3 flex justify-center items-center gap-1'>
                                        <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                                        <p >{post.views}</p>
                                    </div>}

                                </div>
                            ))}
                        </div>
                        {loadingPost && (
                            <h1 className='w-full text-center'>Loading...</h1>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
