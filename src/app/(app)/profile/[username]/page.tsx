"use client"
import React, { useEffect, useState } from "react"
import { UploadIcon, HomeIcon, Loader } from "lucide-react"
import ThemeModeToggle from "@/app/components/ThemeModeToggle"
import Link from "next/link"
import axios from "axios"
import { Heart } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import PostView from "@/app/components/singlePost"
import Footer from "@/app/components/footer"
import { useParams } from "next/navigation"
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


function Profile() {
    const [postClicked, setPostClicked] = useState(false)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loadingPost, setLoadingPost] = useState(false)
    const [loadingUserDetails, setLoadingUserDetails] = useState(true)
    const [postid, setPostid] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const router = useRouter()

    const params = useParams()
    const username = params.username

    useEffect(() => {
        setCurrentUser({})
        console.log("the code is trigerring......")
        const currentUsername = async () => {
            const response = await axios.get('/api/getUsername')
            setCurrentUser(response.data.data)
            console.log(currentUser)
            if (username === response.data.data.username) router.replace(`/profile`)
        }
        currentUsername()
    }, [username])

    const fetchPosts = async () => {
        try {
            const response = await axios.post(`/api/users/profile/${username}`, { task: 'fetchPosts', username })
            const postData = response.data
            setPosts(postData)
        } catch (error: unknown) {
            console.error(error.message)
        } finally {
            setLoadingPost(false)
        }
    }

    const optimizeCloudinaryUrl = (url: string) => {
        return url.replace('/upload/', '/upload/w_300,h_300,c_fill,q_auto,f_auto/');
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.post(`/api/users/profile/${username}`, { task: 'fetchUserData', username })
            const user_ = response.data.data
            setUser(user_)

        } catch (error: unknown) {
            console.error(error.message)
            toast.error("Network error")
        } finally {
            setLoadingUserDetails(false)
        }
    }




    useEffect(() => {
        setPostClicked(false)
        setLoadingPost(true)
        fetchUserData()
        fetchPosts()
    }, [])


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
                    {!loadingUserDetails && 
                    <Link href="/profile" className="relative size-12 rounded-full overflow-hidden text-xl cursor-pointer ">
                        <Image alt="user logo" src={currentUser.avatar} className="object-cover hover:opacity-65" fill  priority/>
                    </Link>}
                    {loadingUserDetails && <Loader className="animate-spin w-6 h-6 text-gray-500" />}
                </div>
            </div>

            <h1 className="text-3xl pl-6 font-bold">{postClicked ? "Post" : ""}</h1>

            <div className=" flex p-6 w-full gap-6">
                {
                    <div className={`profile-card post-card flex flex-col gap-6 ${postClicked ? "w-2/3" : "w-3/6"} `}>
                        {postClicked &&
                            <PostView postid={postid} username={user!.username} avatarUrl={user?.avatar} isAdmin={false} userid={user?._id} />}

                        <h1 className="text-3xl pl-6 font-bold">Profile</h1>

                        {!loadingUserDetails &&
                            <div className="flex p-2 w-full h-fit gap-6 shadow-xl">
                                <div className="avatar-circle size-36 rounded-full relative overflow-hidden">
                                    <Image alt="user profile pic" src={user?.avatar} className="object-cover" fill/>
                                </div>
                                <div className="flex flex-col h-full  items-start pt-0 p-6 ">
                                    <h1 className="username text-3xl font-bold pb-2">@{user?.username}</h1>
                                    <h2 className="fullname text-xl text-gray-500">{user?.fullname}</h2>

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
                    <h1 className='text-3xl font-bold p-2 pl-4'>Posts</h1>
                    <div className="w-full p-4 max-h-full overflow-scroll no-scrollbar">
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

export default Profile