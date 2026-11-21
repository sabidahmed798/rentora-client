import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your Rentora account.",
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Dashboard
        </p>

        <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome back, {session.user.name}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Signed in as {session.user.email}. This is where your bookings and
          listings will appear.
        </p>
      </div>
    </section>
  )
}
