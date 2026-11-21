"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MenuIcon, LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
// import { cn } from "@/lib/utils";

import rentoraLogo from "../images/rentora.png.jpeg";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

import { useSession, signOut } from "../lib/auth-client";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "cn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "AllEquipment", href: "/all-equipment" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const loginClasses = cn(
  buttonVariants({ variant: "outline" }),
  "border-primary/30 text-primary hover:border-primary/50 hover:bg-primary/5 hover:text-primary dark:border-primary/40 dark:hover:bg-primary/10",
);

function RentoraLogo() {
  return (
    <Link href="/" aria-label="Rentora home" className="shrink-0">
      <Image
        src={rentoraLogo}
        alt="Rentora"
        className="h-9 w-[126px] rounded-md object-cover object-[50%_57%]"
      />
    </Link>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </Button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const isLoggedIn = !!session;

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <RentoraLogo />

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "font-medium text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {!isPending &&
            (isLoggedIn ? (
              <>
                <Link href="/dashboard" className={buttonVariants()}>
                  Dashboard
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOutIcon />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className={loginClasses}>
                  Login
                </Link>
                <Link href="/register" className={buttonVariants()}>
                  Register
                </Link>
              </>
            ))}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>

            <SheetContent side="right" className="gap-0">
              <SheetHeader className="border-b border-border px-4 py-3">
                <SheetTitle className="flex items-center">
                  <RentoraLogo />
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Main" className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      pathname === link.href &&
                        "bg-muted font-medium text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                {!isPending &&
                  (isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className={cn(buttonVariants(), "w-full")}
                      >
                        Dashboard
                      </Link>
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full"
                      >
                        <LogOutIcon />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className={cn(loginClasses, "w-full")}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className={cn(buttonVariants(), "w-full")}
                      >
                        Register
                      </Link>
                    </>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
