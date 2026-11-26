"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CircleCheckIcon, ImageIcon } from "lucide-react";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createproduct } from "@/lib/actions/products";

const categories = [
  "Earthmoving",
  "Access",
  "Concrete",
  "Power",
  "Tools",
  "Other",
];

const conditions = ["Like new", "Good", "Fair"];
const rentTypes = ["Daily", "Weekly", "Monthly"];

const labelClasses = "mb-1.5 block text-sm font-medium text-foreground";
const selectClasses =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
const cardClasses = "rounded-2xl border border-border bg-card p-6";

type Preview = {
  name: string;
  category: string;
  location: string;
  rentType: string;
};

const emptyPreview: Preview = {
  name: "",
  category: "",
  location: "",
  rentType: "Daily",
};

function SectionHeading({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {number}
      </span>
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function SegmentedControl({
  legend,
  name,
  options,
  defaultValue,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  defaultValue: string;
  onChange?: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className={labelClasses}>{legend}</legend>
      <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
        {options.map((option) => (
          <label
            key={option}
            className="cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium text-muted-foreground transition has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
          >
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={option === defaultValue}
              className="sr-only"
              onChange={(event) => onChange?.(event.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function AddEquipmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );
  const [preview, setPreview] = useState<Preview>(emptyPreview);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Revoke the object URL when the image changes or the form unmounts.
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setImageError("Image must be 5MB or smaller.");
      return;
    }

    setImageError(null);
    setImageSrc(URL.createObjectURL(file));
  }

  function resetForm() {
    formRef.current?.reset();
    setPreview(emptyPreview);
    setImageSrc(null);
    setImageError(null);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // fetch("http://localhost:5000/product", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
    const result = createproduct(formData);
    console.log(result);

    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    setSubmitted(data);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
        <CircleCheckIcon
          aria-hidden
          className="mx-auto size-10 text-emerald-600"
        />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Your equipment has been submitted
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          New listings start as{" "}
          <span className="font-medium text-foreground">Pending</span> until an
          admin approves them. You can track its status from your dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard/owner/my-equipment"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-lg bg-[#d9f95f] px-6 text-[#0f1f14] hover:bg-[#cdf24a] hover:text-[#0f1f14] focus-visible:border-[#0f1f14]/30 focus-visible:ring-[#0f1f14]/30",
            )}
          >
            View my equipment
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-6"
            onClick={() => {
              setSubmitted(null);
              resetForm();
            }}
          >
            Add another item
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
    >
      {/* Left column — form sections */}
      <div className="space-y-6">
        <section className={cardClasses}>
          <SectionHeading
            number={1}
            title="Basic information"
            description="Tell renters what you are offering."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Equipment name
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="e.g. Mini Excavator 1.8t"
                value={preview.name}
                onChange={(event) =>
                  setPreview((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
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
                onChange={(event) =>
                  setPreview((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="brand" className={labelClasses}>
                Brand
              </label>
              <Input id="brand" name="brand" placeholder="e.g. Kubota" />
            </div>

            <div>
              <label htmlFor="model" className={labelClasses}>
                Model
              </label>
              <Input id="model" name="model" placeholder="e.g. KX030-4" />
            </div>

            <div className="sm:col-span-2">
              <SegmentedControl
                legend="Equipment condition"
                name="condition"
                options={conditions}
                defaultValue="Good"
              />
            </div>
          </div>
        </section>

        <section className={cardClasses}>
          <SectionHeading
            number={2}
            title="Pricing and availability"
            description="Set your rates and how many units you can rent."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className={labelClasses}>
                Rental price
              </label>
              <div className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground"
                >
                  $
                </span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className={labelClasses}>
                Available quantity
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                required
                defaultValue={1}
              />
            </div>

            <div className="sm:col-span-2">
              <SegmentedControl
                legend="Rent type"
                name="rentType"
                options={rentTypes}
                defaultValue="Daily"
                onChange={(value) =>
                  setPreview((current) => ({ ...current, rentType: value }))
                }
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
                placeholder="e.g. City, area"
                value={preview.location}
                onChange={(event) =>
                  setPreview((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
              />
            </div>
          </div>
        </section>

        <section className={cardClasses}>
          <SectionHeading
            number={3}
            title="Description and terms"
            description="Share details, condition and rental rules."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="description" className={labelClasses}>
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="What is it, what is included, how is it used?"
              />
            </div>

            <div>
              <label htmlFor="terms" className={labelClasses}>
                Rental terms and conditions
              </label>
              <Textarea
                id="terms"
                name="terms"
                rows={5}
                placeholder="Deposit, damage policy, return time"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Right column — image upload + listing preview */}
      <aside className="space-y-6 lg:sticky lg:top-6">
        <section className={cardClasses}>
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Equipment image
          </h2>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-4 py-7 text-center transition hover:border-primary/50 hover:bg-primary/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="sr-only"
              onChange={handleImageChange}
            />
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt="Equipment preview"
                className="h-28 w-full rounded-lg object-cover"
              />
            ) : (
              <ImageIcon aria-hidden className="size-7 text-primary" />
            )}
            <span className="mt-2 text-sm font-medium text-foreground">
              Click to upload image
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground">
              JPG, PNG, up to 5MB
            </span>
          </label>
          {imageError ? (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {imageError}
            </p>
          ) : null}
        </section>

        <section className={cardClasses}>
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Listing preview
          </p>

          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative flex aspect-[16/9] items-center justify-center bg-muted">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc}
                  alt="Listing preview"
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <ImageIcon
                  aria-hidden
                  className="size-8 text-muted-foreground"
                />
              )}
              <span className="absolute top-2 left-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                {preview.category || "Category"}
              </span>
              <span className="absolute top-2 right-2 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                Pending
              </span>
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-semibold text-foreground">
                {preview.name || "Equipment name"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {preview.location || "Location"}
              </p>
              <p className="mt-1.5 text-xs font-medium text-primary">
                {preview.rentType}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
            New listings start as <span className="font-semibold">Pending</span>{" "}
            until an admin approves them.
          </div>

          <Button type="submit" size="lg" className="mt-4 h-11 w-full px-6">
            Submit for approval
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="mt-2 h-11 w-full px-6"
            onClick={resetForm}
          >
            Cancel
          </Button>
        </section>
      </aside>
    </form>
  );
}
