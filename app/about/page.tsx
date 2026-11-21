import type { Metadata } from "next"
import Link from "next/link"
import { HandshakeIcon, ShieldCheckIcon, StarIcon } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About",
  description:
    "Rentora is an equipment rental marketplace connecting verified owners with trusted renters.",
}

const values = [
  {
    icon: ShieldCheckIcon,
    title: "Verified people",
    description:
      "Every owner and renter goes through identity verification, so you always know who you're dealing with.",
  },
  {
    icon: HandshakeIcon,
    title: "Fair deals",
    description:
      "Clear daily pricing and secure Stripe payments mean no surprises for either side of the rental.",
  },
  {
    icon: StarIcon,
    title: "Quality first",
    description:
      "Ratings and reviews keep standards high and make it easy to pick equipment you can trust.",
  },
]

const stats: { value: string; label: string }[] = [
  { value: "500+", label: "Equipment items" },
  { value: "120+", label: "Verified owners" },
  { value: "4.8", label: "Average rating" },
]

export default function Page() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          About Rentora
        </p>

        <h1 className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl">
          Equipment rental,{" "}
          <span className="rounded-sm bg-[#d9f95f] box-decoration-clone px-2 py-1 text-[#0f1f14]">
            done right.
          </span>
        </h1>

        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Rentora started with a simple frustration: finding reliable
            equipment to rent was slow, and owners had no easy way to earn from
            the machines sitting idle in their yard.
          </p>
          <p>
            We built a marketplace where both sides meet in the middle — verified
            owners list their gear, trusted renters book it for exactly the
            period they need, and secure payment happens online every time.
          </p>
          <p>
            From a single power drill to a full-sized excavator, our goal is the
            same: make renting equipment as straightforward as ordering
            anything else online.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:max-w-2xl">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <value.icon aria-hidden className="size-6 text-primary" />
              <h2 className="mt-4 font-semibold text-foreground">
                {value.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>

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
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-lg px-6"
            )}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}
