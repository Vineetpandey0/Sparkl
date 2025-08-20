import React from 'react'
import LoginPage from './login/page'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Instagram, Linkedin } from 'lucide-react'

function home() {
  return (
    <div className='flex flex-col items-center p-4 pr-8 pl-8 h-screen bg-black text-white '>
      <div className='flex w-full'>
        <div className='text-5xl text-center --font-edu w-1/2 flex items-start '>Ripple</div>
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
  )
}

export default home