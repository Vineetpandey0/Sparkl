"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function upload() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)

    const  uploadFile = async () => {
        if(!file){
            toast.error("No file selected")
            return
        }

        try {
            const formData = new FormData()
            formData.append("avatar", file)
            
            const response = await axios.post('/api/users/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            toast.success("File Uploaded successfully")
            console.log(response)
            router.push('/')
        } catch (error: any) {
            console.log(error.message)
            toast.error("Error Uploading")
        }
    }

  return (

    <div>
        <Input 
        type='file'
        onChange={(e) => setFile(e.target?.files?.[0] || null)} 
        />
        <Button
            type="submit"
            className=" text-md cursor-pointer bg-purple-700"
            onClick={uploadFile}
        >
           Upload
        </Button>
    </div>
  )
}

export default upload