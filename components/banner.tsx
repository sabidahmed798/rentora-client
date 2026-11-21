import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeCheckIcon, LockIcon, StarIcon } from "lucide-react";
import { cn } from "cn";

// import { buttonVariants } from "@/components/ui/button";
import { EquipmentIllustration } from "./equipment-illustration";
import { buttonVariants } from "./ui/button";
// import { EquipmentIllustration } from "@/components/equipment-illustration"

const stats: { value: ReactNode; label: string }[] = [
  { value: "500+", label: "Equipment items" },
  { value: "120+", label: "Verified owners" },
  {
    value: (
      <>
        4.8
        <StarIcon
          aria-hidden
          className="ml-1 inline-block size-4 -translate-y-0.5 fill-current"
        />
      </>
    ),
    label: "Average rating",
  },
];

export function Banner() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Equipment Rental Marketplace
          </p>

          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Rent smarter.{" "}
            <span className="rounded-sm bg-[#d9f95f] box-decoration-clone px-2 py-1 text-[#0f1f14]">
              Build faster.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Find verified equipment from trusted owners, book for any period and
            pay securely online.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/all-equipment"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-lg bg-[#d9f95f] px-6 text-[#0f1f14] hover:bg-[#cdf24a] hover:text-[#0f1f14] focus-visible:border-[#0f1f14]/30 focus-visible:ring-[#0f1f14]/30",
              )}
            >
              Browse Equipment
            </Link>
            <Link
              href="/list-equipment"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-lg bg-[#3a30ce] px-6 text-white hover:bg-[#d4d3e0] hover:text-white focus-visible:border-white/30 focus-visible:ring-white/30",
              )}
            >
              List Your Equipment
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
            <EquipmentIllustration />
          </div>

          <div className="absolute -top-3 -left-3 inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-2 text-xs font-medium text-foreground shadow-lg ring-1 ring-border/60 sm:text-sm">
            <BadgeCheckIcon aria-hidden className="size-4 text-emerald-600" />
            Verified Owners
          </div>

          <div className="absolute -right-3 -bottom-3 inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-2 text-xs font-medium text-foreground shadow-lg ring-1 ring-border/60 sm:text-sm">
            <LockIcon aria-hidden className="size-4 text-foreground" />
            Secure Stripe Payments
          </div>
        </div>
      </div>
    </section>
  );
}
