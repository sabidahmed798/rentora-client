"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpFromLineIcon,
  BadgeCheckIcon,
  ConstructionIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  TruckIcon,
  WrenchIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import { Input } from "@/components/ui/input"

export type EquipmentItem = {
  id: string
  name: string
  category: string
  pricePerDay: number
  rating: number
  reviews: number
  location: string
  verified: boolean
}

const categoryIcons: Record<string, LucideIcon> = {
  Earthmoving: TruckIcon,
  Access: ArrowUpFromLineIcon,
  Concrete: ConstructionIcon,
  Power: ZapIcon,
  Tools: WrenchIcon,
}

const categories = ["All", "Earthmoving", "Access", "Concrete", "Power", "Tools"]

export function EquipmentCatalog({ items }: { items: EquipmentItem[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category
      const matchesQuery =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [items, query, category])

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search equipment or location"
            aria-label="Search equipment"
            className="h-11 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={cn(
                "rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground",
                category === name &&
                  "border-primary/40 bg-primary/10 font-medium text-primary"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-muted-foreground" role="status">
        {filtered.length} {filtered.length === 1 ? "item" : "items"} available
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <p className="font-medium text-foreground">No equipment found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const Icon = categoryIcons[item.category] ?? WrenchIcon
            return (
              <li
                key={item.id}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative flex aspect-[3/2] items-center justify-center bg-muted">
                  <Icon aria-hidden className="size-12 text-muted-foreground/50" />

                  {item.verified && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-medium shadow-lg ring-1 ring-border/60">
                      <BadgeCheckIcon aria-hidden className="size-3.5 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-foreground">{item.name}</h2>
                    <p className="shrink-0 text-lg font-bold text-foreground">
                      ${item.pricePerDay}
                      <span className="text-xs font-normal text-muted-foreground">/day</span>
                    </p>
                  </div>

                  <p className="mt-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    {item.category}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <StarIcon
                        aria-hidden
                        className="size-3.5 -translate-y-px fill-current text-foreground"
                      />
                      {item.rating}
                      <span className="text-xs">({item.reviews} reviews)</span>
                    </span>
                    <span className="inline-flex min-w-0 items-center gap-1 text-xs sm:text-sm">
                      <MapPinIcon aria-hidden className="size-3.5 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
