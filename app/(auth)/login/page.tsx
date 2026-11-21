import type { Metadata } from "next"

import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login | Rentora",
  description: "Sign in to your Rentora account.",
}

export default function Page() {
  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      {/* Left Side - Branding */}
      <section className="flex min-h-[420px] flex-col justify-center bg-gradient-to-br from-indigo-700 to-indigo-900 px-8 py-12 text-white sm:px-12 lg:min-h-screen lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <p className="mb-8 text-xl font-extrabold tracking-tight">Rentora</p>

          <h1 className="max-w-md text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Rent smarter. List what you own.
          </h1>

          <p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100">
            One account for renting equipment and earning from your own
            equipment. Find the right tools for every project.
          </p>

          {/* Equipment Illustration */}
          <div className="mt-9 flex h-56 max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-indigo-200 shadow-xl">
            <svg
              viewBox="0 0 400 300"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="400" height="300" fill="#c7d2fe" />

              <circle cx="320" cy="65" r="35" fill="#fde68a" />

              <ellipse cx="105" cy="62" rx="45" ry="13" fill="#eef2ff" />

              <path
                d="M0 205 Q100 145 190 195 T400 185 V300 H0Z"
                fill="#818cf8"
              />

              <path d="M0 245 H400 V300 H0Z" fill="#312e81" />

              {/* Excavator body */}
              <rect
                x="145"
                y="178"
                width="125"
                height="55"
                rx="8"
                fill="#4f46e5"
              />

              <rect
                x="150"
                y="150"
                width="65"
                height="40"
                rx="8"
                fill="#eef2ff"
              />

              <path d="M160 160 H205 L222 190 H160Z" fill="#c7d2fe" />

              {/* Excavator arm */}
              <path
                d="M265 190 L310 135 L350 185"
                stroke="#4338ca"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              <path d="M350 185 L365 190 L350 220 L333 215Z" fill="#1e1b4b" />

              {/* Wheels */}
              <rect
                x="130"
                y="228"
                width="170"
                height="30"
                rx="15"
                fill="#1e1b4b"
              />

              <circle cx="160" cy="243" r="10" fill="#6366f1" />
              <circle cx="215" cy="243" r="10" fill="#6366f1" />
              <circle cx="270" cy="243" r="10" fill="#6366f1" />
            </svg>
          </div>
        </div>
      </section>

      {/* Right Side - Login */}
      <section className="flex min-h-[500px] items-center justify-center bg-slate-50 px-6 py-14 sm:px-12 lg:min-h-screen">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your Rentora account.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  )
}
