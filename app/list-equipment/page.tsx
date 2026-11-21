import type { Metadata } from "next"

import { ListEquipmentForm } from "@/components/list-equipment-form"

export const metadata: Metadata = {
  title: "List Your Equipment",
  description:
    "List your equipment on Rentora and earn from rentals with verified tenants.",
}

const benefits = [
  "Reach thousands of verified renters",
  "You set the price and availability",
  "Secure payments handled for you",
]

export default function Page() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:py-20">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            For Owners
          </p>

          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl">
            List your equipment
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Have machinery, tools or gear sitting idle? Put them to work and earn
            on your own schedule.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#d9f95f] text-xs font-bold text-[#0f1f14]"
                >
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-foreground sm:text-base">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ListEquipmentForm />
      </div>
    </section>
  )
}
