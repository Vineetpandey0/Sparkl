"use client"
import React, { useEffect, useState } from 'react'
import {  useRouter } from "next/navigation";
import axios from 'axios';
import {  Heart } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from '@/components/ui/skeleton';

import {formatDistanceToNow, parseISO} from 'date-fns'
import toast from 'react-hot-toast';

function PostView({postid, username, avatarUrl, isAdmin}:any) {
    const [liked, setLiked] = useState(false);
    const [createdAt, setCreatedAt] = useState('')
    const [postUrl, setPostUrl] = useState('')
    const [caption, setCaption] = useState('')
    const [like, setLike] = useState(0)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const fetchPostUrl = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/post', {postid})
            console.log(response.data.data)
            const postData = response.data.data
            setPostUrl(postData.postFile)
            setCaption(postData.caption)
            setCreatedAt(postData.createdAt)
            
        } catch (error: any) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const timeAgo = createdAt ? formatDistanceToNow(parseISO(createdAt), { addSuffix: true }) : "";

    console.log(timeAgo) // e.g. "3 hours ago"

    const deletePost = async () => {
        try {
            const response = await axios.delete('/api/users/deletePost',{
                data: {postid}
            })
            console.log(response.data.data)
            toast.success("Successfully deleted post")
            window.location.reload()

        } catch (error:any) {
            console.error(error.message)
            toast.error("Error deleting post")
        }
    }

    useEffect(() => {
        console.log("useeffect is rendering")
        fetchPostUrl()
    }, [])
    useEffect(() => {
        console.log("useeffect is rendering for postid")
        fetchPostUrl()
    }, [postid])


    return (
        <div className='' >

            <div className="w-full h-full flex justify-center ">
                {!loading && 
                <div className="w-full max-w-[600px] rounded-md border-none border-border bg-background shadow-2xl ">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <span className="text-sm font-semibold">{username}</span>
                        </div>
                        {isAdmin && 
                        <AlertDialog >
                        <AlertDialogTrigger className='text-red-600 cursor-pointer'>Delete</AlertDialogTrigger>
                        <AlertDialogContent className='bg-white'>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your post
                                and this post can not be recovered once deleted.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                            onClick={deletePost}
                            className='cursor-pointer text-red-600'
                            >Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>}
                        
                    </div>

                    {/* Image */}
                    <div className="w-full bg-black">
                        <img
                            src={postUrl}
                            alt="post"
                            className="w-full h-auto max-h-[600px] object-contain"
                        />
                    </div>

                    {/* Actions */}
                    <div className="px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center gap-3">
                                <button onClick={() => setLiked((v) => !v)} className="outline-none">
                                    <Heart
                                        className={`h-7 w-7 transition-transform ${liked ? "fill-red-500 text-red-500" : ""
                                            }`}
                                    />
                                </button>
                                {/* Likes */}
                                <p className="text-xl font-semibold">{like}</p>
                            </div>
                        </div>


                        {/* Caption */}
                        <p className="mt-1 text-sm">
                            <span className="font-semibold mr-2">@{username}</span>
                            {caption}
                        </p>

                        {/* Time */}
                        <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                            {timeAgo}
                        </p>
                    </div>

                    
                </div>}

                {loading && 
                <div className="flex flex-col p-2 w-full h-fit  shadow-xl">
                    <div className='flex gap-4 p-4'>
                        <Skeleton className="size-8 rounded-full bg-gray-500" />
                        <Skeleton className="w-18 h-5 bg-gray-500" />
                    </div>
                    <div className="space-y-2 flex flex-col h-full items-center w-full pt-2 p-6">
                        <Skeleton className="h-[400px] w-full bg-gray-500" />
                    </div>
                </div>
}
            </div>
        

        </div>
    )
}

export default PostView