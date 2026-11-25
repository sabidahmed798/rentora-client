"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircleIcon, UserPlusIcon } from "lucide-react"

import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const labelClasses = "mb-1.5 block text-sm font-medium text-foreground"

const roles = [
  {
    value: "customer",
    title: "Customer",
    description: "Browse and rent equipment",
  },
  {
    value: "owner",
    title: "Owner",
    description: "List your equipment for rent",
  },
  {
    value: "admin",
    title: "Admin",
    description: "Manage the platform",
  },
] as const

type Role = (typeof roles)[number]["value"]

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const formData = new FormData(event.currentTarget)
    const roleValue = String(formData.get("role") ?? "customer")
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      role: roles.some((role) => role.value === roleValue) ? (roleValue as Role) : "customer",
    }

    console.log("[register] form payload:", payload)

    const { data, error } = await signUp.email(payload)

    console.log("[register] response:", { data, error })

    setPending(false)

    if (error) {
      setError(
        error.message ?? "Unable to create your account. Please try again."
      )
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      {error && (
        <p
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          <AlertCircleIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClasses}>
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="At least 8 characters"
          />
        </div>

        <fieldset>
          <legend className={labelClasses}>I am a…</legend>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <label
                key={role.value}
                className="cursor-pointer rounded-lg border border-border bg-background p-3 text-center transition has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  defaultChecked={role.value === "customer"}
                  className="sr-only"
                />
                <span className="block text-sm font-medium text-foreground">
                  {role.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {role.description}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-6 h-11 w-full gap-2 bg-[#0439ad] px-6 text-white hover:bg-[#41fc30] hover:text-white focus-visible:border-white/30 focus-visible:ring-white/30"
      >
        <UserPlusIcon aria-hidden className="size-4" />
        {pending ? "Creating account…" : "Create account"}
      </Button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  )
}
