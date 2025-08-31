"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow, parseISO } from 'date-fns'
import toast from 'react-hot-toast';
import Image from 'next/image';
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
import { useRouter } from 'next/navigation';


function PostView({ postid, username, avatarUrl, isAdmin, userid }: any) {
  const [liked, setLiked] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [like, setLike] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const fetchPostUrl = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/post', { postid, userid });
      const postData = response.data.data;

      setPostUrl(postData.postFile);
      setCaption(postData.caption);
      setCreatedAt(postData.createdAt);
      setLike(postData.views);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  const checkIfLiked = async () => {
  try {
    const response = await axios.get('/api/likeUpdate', { 
      params: { postid, userid } 
    });
    console.log(response.data)
    setLiked(response.data.data)
  } catch (error) {
    console.error('Error checking like:', error);
  }
};
    
    const deletePost = async () => {
    try {
      await axios.delete(`/api/users/deletePost`)
      toast.success("Post deleted successfully!") // optional
      router.push("/") // redirect after delete
    } catch (error: any) {
      console.error(error)
      toast.error("Failed to delete post") // optional
    }
  }

  const toggleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLike(prev => newLiked ? prev + 1 : prev - 1);
    let newLike
    if(newLiked) {
        newLike = like + 1
    } else {
        newLike = like - 1
    }

    try {
      const response = await axios.post('/api/likeUpdate', { postid, userid, liked: newLiked, like: newLike });
      console.log(response.data.data.alreadyLiked);
      setLiked(response.data.data.alreadyLiked)
    } catch (error) {
      console.error("Failed to update like", error);
      toast.error("Failed to update like");
      setLiked(prev => !prev);
      setLike(prev => newLiked ? prev - 1 : prev + 1);
    }
  }

  const timeAgo = createdAt ? formatDistanceToNow(parseISO(createdAt), { addSuffix: true }) : "";

  useEffect(() => {
    fetchPostUrl();
    checkIfLiked()
  }, [postid]);

  return (
    <div className='w-full flex justify-center'>
      {!loading ? (
        <div className="w-full max-w-[600px] rounded-md bg-background shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex relative size-10 items-center gap-3">
                <Image
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-full object-cover"
                    fill
                    unoptimized
                />
                <span className="text-sm absolute left-12 font-semibold">{username}</span>
            </div>
            {isAdmin &&
                <AlertDialog >
                    <AlertDialogTrigger className='text-red-600 cursor-pointer'>Delete</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your post
                                and this post cannot be recovered once deleted.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={deletePost}
                                className='cursor-pointer text-red-600'
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }

          </div>

          <div className="w-full relative flex items-center justify-center bg-black">
            <Image src={postUrl} alt="post" width={0} height={0} sizes="100vw" className="h-auto w-auto" unoptimized />
          </div>

          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={toggleLike} className="outline-none">
                <Heart className={`h-7 w-7 transition-transform ${liked ? "fill-red-500 text-red-500" : ""}`} />
              </button>
              <p className="text-xl font-semibold">{like}</p>
            </div>
            <p className="mt-1 text-sm"><span className="font-semibold mr-2">@{username}</span>{caption}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-2 w-full h-fit shadow-xl">
          <div className='flex gap-4 p-4'>
            <Skeleton className="size-8 rounded-full bg-gray-500" />
            <Skeleton className="w-18 h-5 bg-gray-500" />
          </div>
          <div className="space-y-2 flex flex-col h-full items-center w-full pt-2 p-6">
            <Skeleton className="h-[400px] w-full bg-gray-500" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostView;
