"use client"
import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { formatDistanceToNow, parseISO } from "date-fns"
import Link from "next/link"
import { Loader } from "lucide-react"

function PostFetch() {
  const [posts, setPosts] = useState<unknown[]>([])
  const [visiblePosts, setVisiblePosts] = useState<unknown[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)   // 🔹 add loading state
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const CHUNK_SIZE = 10

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true) // start loading
      const response = await axios.get("/api/postFetch")
      const postData = response.data
      setPosts(postData)
      setVisiblePosts(postData.slice(0, CHUNK_SIZE))
    } catch (error: unknown) {
      console.error(error.message)
    } finally {
      setLoading(false) // stop loading
    }
  }

  // Load more posts
  const loadMore = () => {
    const nextPage = page + 1
    const start = (nextPage - 1) * CHUNK_SIZE
    const end = start + CHUNK_SIZE
    const newPosts = posts.slice(start, end)
    setVisiblePosts((prev) => [...prev, ...newPosts])
    setPage(nextPage)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Observe loader div
  useEffect(() => {
    if (!posts.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visiblePosts.length < posts.length) {
          loadMore()
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [visiblePosts, posts])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    )
  }

  return (
    <div className="w-full p-4 space-y-8">
      {Array.from({ length: Math.ceil(visiblePosts.length / CHUNK_SIZE) }).map(
        (_, chunkIndex) => {
          const start = chunkIndex * CHUNK_SIZE
          const end = start + CHUNK_SIZE
          const chunkPosts = visiblePosts.slice(start, end)

          return (
            <div
              key={chunkIndex}
              className="columns-3 gap-6 w-full"
            >
              {chunkPosts.map((post: unknown, index: number) => (
                <div
                  key={`${chunkIndex}-${index}`}
                  className="inline-block w-full rounded-xl overflow-hidden shadow-xl mb-6 break-inside-avoid"
                >
                  {/* Header */}
                  <div className="flex items-center border-none gap-3 p-3">
                    <img
                      src={post.avatar || "/default-avatar.png"}
                      alt="avatar"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <Link
                      href={`/profile/${post.username}`}
                      className="font-medium hover:underline"
                    >
                      {post.username}
                    </Link>
                  </div>

                  {/* Post Image */}
                  <img
                    src={post.postFile}
                    alt={`post-${index}`}
                    className="w-full h-auto"
                  />

                  {/* Caption */}
                  {post.caption && (
                    <div className="p-3 pb-0 text-sm">
                      <span className="font-semibold">@{post.username}</span>{" "}
                      {post.caption}
                    </div>
                  )}

                  <p className="mt-2 pl-3 pb-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                    {post.createdAt
                      ? formatDistanceToNow(parseISO(post.createdAt), {
                        addSuffix: true,
                      })
                      : ""}
                  </p>
                </div>
              ))}
            </div>
          )
        }
      )}

      {/* Loader div */}
      <div
        ref={loaderRef}
        className="h-10 flex justify-center items-center text-gray-500"
      >
        {visiblePosts.length >= posts.length ? (
          "No more posts"
        ) : (
          <Loader className="animate-spin w-6 h-6 text-gray-500" />
        )}
      </div>
    </div>
  )

}

export default PostFetch
