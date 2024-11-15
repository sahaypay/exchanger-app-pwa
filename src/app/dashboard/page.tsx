import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { logout } from "@/app/actions/auth"

export default async function DashboardPage() {
  const session = await auth()

  console.log("session at dashboard: 🚀 ", session)

  if (!session) {
    redirect("/login")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}