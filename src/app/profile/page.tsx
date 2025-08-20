"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState('nothing')

    const logout = async() => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/profile')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2> {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>} </h2>

            <hr />

            <button
            className="bg-blue-600"
            onClick={logout}
            >Logout</button>

            <button
            className="bg-purple-800"
            onClick={getUserDetails}
            >User Details</button>
        </div>
    )
}