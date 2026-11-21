import type { Metadata } from "next"

import { EquipmentCatalog } from "@/components/equipment-catalog"

export const metadata: Metadata = {
  title: "All Equipment",
  description:
    "Browse verified equipment available to rent from trusted owners across Texas.",
}

const equipment = [
  {
    id: "mini-excavator",
    name: "Mini Excavator 1.8t",
    category: "Earthmoving",
    pricePerDay: 120,
    rating: 4.9,
    reviews: 64,
    location: "Austin, TX",
    verified: true,
  },
  {
    id: "scaffolding-set",
    name: "Scaffolding Set (12m)",
    category: "Access",
    pricePerDay: 45,
    rating: 4.7,
    reviews: 38,
    location: "Dallas, TX",
    verified: true,
  },
  {
    id: "concrete-mixer",
    name: "Concrete Mixer 350L",
    category: "Concrete",
    pricePerDay: 60,
    rating: 4.8,
    reviews: 51,
    location: "Houston, TX",
    verified: true,
  },
  {
    id: "power-drill-kit",
    name: "Cordless Power Drill Kit",
    category: "Tools",
    pricePerDay: 18,
    rating: 4.6,
    reviews: 92,
    location: "San Antonio, TX",
    verified: false,
  },
  {
    id: "wheel-loader",
    name: "Wheel Loader 3t",
    category: "Earthmoving",
    pricePerDay: 180,
    rating: 4.9,
    reviews: 27,
    location: "Fort Worth, TX",
    verified: true,
  },
  {
    id: "portable-generator",
    name: "Portable Generator 5kW",
    category: "Power",
    pricePerDay: 35,
    rating: 4.7,
    reviews: 74,
    location: "Austin, TX",
    verified: true,
  },
  {
    id: "scissor-lift",
    name: "Electric Scissor Lift 8m",
    category: "Access",
    pricePerDay: 95,
    rating: 4.8,
    reviews: 33,
    location: "Plano, TX",
    verified: true,
  },
  {
    id: "demolition-hammer",
    name: "Demolition Hammer",
    category: "Tools",
    pricePerDay: 28,
    rating: 4.5,
    reviews: 46,
    location: "Houston, TX",
    verified: false,
  },
]

export default function Page() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Equipment Rental Marketplace
        </p>

        <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl">
          All equipment
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Every listing comes from a verified owner, with clear daily pricing and
          secure payment through Rentora.
        </p>

        <div className="mt-10">
          <EquipmentCatalog items={equipment} />
        </div>
      </div>
    </section>
  )
}
