"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function page() {
  const { setTheme } = useTheme()
    return (
    <div>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
            System
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
            <CardAction>
            <Button variant="link" className="border-2 ">Sign Up</Button>
            </CardAction>
        </CardHeader>
        <CardContent>
            <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    Forgot your password?
                    </a>
                </div>
                <Input id="password" type="password" required />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
            Login
            </Button>
            <Button variant="outline" className="w-full">
            Login with Google
            </Button>
        </CardFooter>
        </Card>
    </div>
  )
}

export default page
