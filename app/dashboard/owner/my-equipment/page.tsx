"use client";

import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "cn";

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

type Status = "Approved" | "Pending" | "Rejected";

type MyEquipment = {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  rentType: "Daily" | "Weekly" | "Monthly";
  location: string;
  condition: "Like new" | "Good" | "Fair";
  status: Status;
};

// Placeholder rows shaped like the payload created by the add-equipment form.
const initialEquipment: MyEquipment[] = [
  {
    id: "eq-1",
    name: "Mini Excavator 3T",
    category: "Earthmoving",
    brand: "Kubota",
    model: "KX030-4",
    price: 120,
    quantity: 3,
    rentType: "Daily",
    location: "Brooklyn, NY",
    condition: "Good",
    status: "Approved",
  },
  {
    id: "eq-2",
    name: "Mirrorless Camera Kit",
    category: "Other",
    brand: "Sony",
    model: "A7 IV",
    price: 35,
    quantity: 1,
    rentType: "Daily",
    location: "Manhattan, NY",
    condition: "Like new",
    status: "Approved",
  },
  {
    id: "eq-3",
    name: "Towable Generator 5kVA",
    category: "Power",
    brand: "Honda",
    model: "EU70is",
    price: 60,
    quantity: 2,
    rentType: "Daily",
    location: "Queens, NY",
    condition: "Good",
    status: "Pending",
  },
  {
    id: "eq-4",
    name: "Cordless Drill Set",
    category: "Tools",
    brand: "DeWalt",
    model: "DCD791",
    price: 25,
    quantity: 5,
    rentType: "Weekly",
    location: "Jersey City, NJ",
    condition: "Fair",
    status: "Rejected",
  },
  {
    id: "eq-5",
    name: "Scissor Lift 10M",
    category: "Access",
    brand: "Genie",
    model: "GS-1930",
    price: 95,
    quantity: 2,
    rentType: "Daily",
    location: "Bronx, NY",
    status: "Pending",
    condition: "Good",
  },
];

const statusStyles: Record<Status, string> = {
  Approved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const columns = [
  "Equipment",
  "Category",
  "Price",
  "Quantity",
  "Status",
  "Actions",
] as const;

const actionClasses = {
  view: cn(
    "border-primary/40 text-primary hover:bg-primary/10 hover:text-primary",
  ),
  update: cn(
    "border-primary/40 text-primary hover:bg-primary/10 hover:text-primary",
  ),
  delete: cn("border-destructive/40 text-destructive hover:bg-destructive/10"),
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}

function RowActions({
  onAction,
  className,
}: {
  onAction: (action: "view" | "update" | "delete") => void;
  className?: string;
}) {
  const actions = [
    { key: "view", label: "View" },
    { key: "update", label: "Update" },
    { key: "delete", label: "Delete" },
  ] as const;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {actions.map((action) => (
        <Button
          key={action.key}
          type="button"
          variant="outline"
          size="sm"
          className={cn("rounded-lg", actionClasses[action.key])}
          onClick={() => onAction(action.key)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

const MyEquipmentPage = () => {
  const [equipment, setEquipment] = useState<MyEquipment[]>(initialEquipment);

  function handleAction(id: string, action: "view" | "update" | "delete") {
    if (action === "delete") {
      setEquipment((current) => current.filter((item) => item.id !== id));
      return;
    }
    // TODO: route to the detail / edit screens once they exist.
    console.log(`${action} equipment`, id);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl">
            My equipment
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Owner dashboard</p>
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

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        {equipment.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center">
            <p className="font-medium text-foreground">
              You have no equipment listed yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Items you add will show up here for review.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop / tablet — table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className={cn(
                          "px-3 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase",
                          column === "Actions" && "text-right",
                        )}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border/60 last:border-b-0 hover:bg-muted/50"
                    >
                      <td className="px-3 py-4">
                        <p className="font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.location} · {item.rentType}
                        </p>
                      </td>
                      <td className="px-3 py-4 text-muted-foreground">
                        {item.category}
                      </td>
                      <td className="px-3 py-4 text-foreground">
                        ${item.price}
                        <span className="text-xs font-normal text-muted-foreground">
                          /{item.rentType.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-muted-foreground">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-3 py-4">
                        <RowActions
                          className="justify-end"
                          onAction={(action) => handleAction(item.id, action)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile — stacked cards */}
            <ul className="space-y-4 md:hidden">
              {equipment.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {item.location} · {item.rentType}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Category
                      </dt>
                      <dd className="mt-1 text-foreground">{item.category}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Price
                      </dt>
                      <dd className="mt-1 text-foreground">${item.price}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Quantity
                      </dt>
                      <dd className="mt-1 text-foreground">{item.quantity}</dd>
                    </div>
                  </dl>

                  <RowActions
                    className="mt-4"
                    onAction={(action) => handleAction(item.id, action)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MyEquipmentPage;
