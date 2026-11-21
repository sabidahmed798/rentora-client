"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRightIcon, CircleCheckIcon } from "lucide-react"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const categories = [
  "Earthmoving",
  "Access",
  "Concrete",
  "Power",
  "Tools",
  "Other",
]

const labelClasses = "mb-1.5 block text-sm font-medium text-foreground"
const selectClasses =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export function ListEquipmentForm() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CircleCheckIcon
          aria-hidden
          className="mx-auto size-10 text-emerald-600"
        />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Your equipment has been submitted
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          We&apos;ll review the listing and publish it once it&apos;s verified.
          You can track its status from your dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/all-equipment"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg bg-[#d9f95f] px-6 text-[#0f1f14] hover:bg-[#cdf24a] hover:text-[#0f1f14] focus-visible:border-[#0f1f14]/30 focus-visible:ring-[#0f1f14]/30"
            )}
          >
            Browse equipment
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-6"
            onClick={() => setSubmitted(false)}
          >
            List another item
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClasses}>
            Equipment name
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder="e.g. Mini Excavator 1.8t"
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClasses}>
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue=""
            className={selectClasses}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className={labelClasses}>
            Price per day (USD)
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            min={1}
            step="0.01"
            required
            placeholder="e.g. 75"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="location" className={labelClasses}>
            Location
          </label>
          <Input
            id="location"
            name="location"
            required
            placeholder="e.g. Austin, TX"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelClasses}>
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="Describe the condition, included accessories and any rental requirements."
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 h-11 w-full gap-2 bg-[#103527] px-6 text-white hover:bg-[#0c2a1e] hover:text-white focus-visible:border-white/30 focus-visible:ring-white/30 sm:w-auto"
      >
        Submit listing
        <ArrowRightIcon aria-hidden className="size-4" />
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        By submitting, you confirm the information is accurate and that you own
        or are authorised to rent out this equipment.
      </p>
    </form>
  )
}
