"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { useEffect, useState } from "react"

function ThemeModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  if (!mounted) return null // Prevent mismatch during hydration

  return (
    <Toggle
      pressed
      onPressedChange={handleToggle}
      aria-label="Toggle theme"
      className="size-9 flex items-center justify-center rounded-full border-none border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer hover:opacity-50"
    >
      {isDark ? (
        <Moon className="size-9  transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Sun className="size-9 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </Toggle>
  )
}

export default ThemeModeToggle
