"use client"
import React from "react"
import Link from "next/link"
import { Github, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t mt-16 ">
      <div className=" mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand / About */}
        <div className="pl-16">
          <h2 className="text-2xl font-bold transition-colors hover:text-gray-800">
            First Project Showcase
          </h2>
          <p className="text-sm mt-3 text-gray-600 leading-relaxed">
            This is my very first project — a platform crafted with passion and 
            constant learning. It represents my journey as a developer, where 
            each line of code takes me one step closer to mastery.
          </p>
        </div>

        {/* Quick Links */}
        <div className="pl-30">
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm ">
            <li><Link href="/" className="hover:opacity-60">Home</Link></li>
            <li><Link href="/profile" className="hover:opacity-60">Profile</Link></li>
            <li><Link href="/upload" className="hover:opacity-60">Upload</Link></li>
            <li><Link href="/login" className="hover:opacity-60">Login</Link></li>
            <li><Link href="/signup" className="hover:opacity-60">Signup</Link></li>
            <li><Link href="/forgotPassword" className="hover:opacity-60">Forgot Password</Link></li>
          </ul>
        </div> 

        {/* Social Links */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
            Join with the Creator
          </h3>
          <div className="flex space-x-5">
            <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 hover:text-gray-400">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 hover:text-gray-400">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 hover:text-gray-400">
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} First Project Showcase. All rights reserved.
      </div>
    </footer>
  )
}
