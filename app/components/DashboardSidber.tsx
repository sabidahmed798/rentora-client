"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { cn } from "cn";

export type UserRole = "admin" | "customer" | "owner";

export type MenuItem = {
  label: string;
  href: string;
};

export const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  owner: [
    { label: "Overview", href: "/dashboard/owner" },
    { label: "Add Equipment", href: "/dashboard/owner/add-equipment" },
    { label: "My Equipment", href: "/dashboard/owner/my-equipment" },
    { label: "My Equipment Rental", href: "/dashboard/owner/rentals" },
    { label: "My Profile", href: "/dashboard/profile" },
  ],
  customer: [
    { label: "Overview", href: "/dashboard/customer" },
    { label: "All Equipment", href: "/all-equipment" },
    { label: "My Rentals", href: "/dashboard/customer/rentals" },
    { label: "My Profile", href: "/dashboard/profile" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin" },
    { label: "Manage Equipment", href: "/dashboard/admin/equipment" },
    { label: "Manage Users", href: "/dashboard/admin/users" },
    { label: "Manage Rentals", href: "/dashboard/admin/rentals" },
    { label: "My Profile", href: "/dashboard/profile" },
  ],
};

export function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const role = (session as { user?: { role?: string } } | null)?.user?.role;
  const menuItems: MenuItem[] =
    role && role in menuItemsByRole
      ? menuItemsByRole[role as UserRole]
      : [];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-medium text-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
