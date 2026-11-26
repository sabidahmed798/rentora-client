"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { AddEquipmentForm } from "@/components/add-equipment-form";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </Button>
  );
}

const AddEquipmentPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl">
            Add equipment
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            List a new item for rent
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <span
            aria-label="Account"
            className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
          >
            AB
          </span>
        </div>
      </div>

      <AddEquipmentForm />
    </div>
  );
};

export default AddEquipmentPage;
