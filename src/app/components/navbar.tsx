import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()
  console.log("Session data:", session)
  if (session) {
    return (
      <div className="text-white">
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="text-white">
      Not signed in <br />
      <button 
      className="cursor-pointer"
      onClick={() => signIn("google")}>Sign in</button>
    </div>
  )
}