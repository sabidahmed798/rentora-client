import type { Metadata } from "next"
import Link from "next/link"
import {
  BadgeCheckIcon,
  CalendarIcon,
  CreditCardIcon,
  SearchIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Renting and listing equipment on Rentora in four simple steps.",
}

const renterSteps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: SearchIcon,
    title: "Browse verified equipment",
    description:
      "Search by category, location or price. Every owner is verified before their listings go live.",
  },
  {
    icon: CalendarIcon,
    title: "Book your dates",
    description:
      "Pick the period you need and request the booking. Owners respond fast, usually within a few hours.",
  },
  {
    icon: CreditCardIcon,
    title: "Pay securely",
    description:
      "Pay online through Stripe. Your money is held safely and only released once the rental starts.",
  },
  {
    icon: WrenchIcon,
    title: "Use it, return it, rate it",
    description:
      "Collect the equipment, get the job done, return it in the agreed condition and leave a review.",
  },
]

const ownerSteps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BadgeCheckIcon,
    title: "Create your listing",
    description:
      "Add photos, pricing and availability for each item you want to rent out.",
  },
  {
    icon: CalendarIcon,
    title: "Accept bookings",
    description:
      "Approve requests that fit your schedule and coordinate pick-up or drop-off.",
  },
  {
    icon: CreditCardIcon,
    title: "Get paid",
    description:
      "Receive secure payouts for every completed rental, with no chasing invoices.",
  },
]

export default function Page() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          How It Works
        </p>

        <h1 className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl">
          Renting equipment, made simple
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Whether you need a machine for a day or want to earn from the ones
          gathering dust, Rentora keeps every step clear and secure.
        </p>

        <h2 className="mt-12 text-lg font-semibold text-foreground sm:text-xl">
          For renters
        </h2>

        <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {renterSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d9f95f] text-sm font-bold text-[#0f1f14]"
                >
                  {index + 1}
                </span>
                <step.icon aria-hidden className="size-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <h2 className="mt-14 text-lg font-semibold text-foreground sm:text-xl">
          For owners
        </h2>

        <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ownerSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#103527] text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <step.icon aria-hidden className="size-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/all-equipment"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg bg-[#d9f95f] px-6 text-[#0f1f14] hover:bg-[#cdf24a] hover:text-[#0f1f14] focus-visible:border-[#0f1f14]/30 focus-visible:ring-[#0f1f14]/30"
            )}
          >
            Browse Equipment
          </Link>
          <Link
            href="/list-equipment"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg bg-[#103527] px-6 text-white hover:bg-[#0c2a1e] hover:text-white focus-visible:border-white/30 focus-visible:ring-white/30"
            )}
          >
            List Your Equipment
          </Link>
        </div>
      </div>
    </section>
  )
}
