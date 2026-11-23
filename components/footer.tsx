"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  HardHatIcon,
  HeadphonesIcon,
  LayoutGridIcon,
  LinkIcon,
  MailIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "cn";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/all-equipment" },
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact Us", href: "/contact" },
];

const equipmentCategories = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
];

const supportLinks = [
  { label: "Help Center", href: "/contact" },
  { label: "Rental Guide", href: "/how-it-works" },
  { label: "Safety & Trust", href: "/about" },
  { label: "FAQs", href: "/contact" },
  { label: "Terms & Conditions", href: "/about" },
];

const socials: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.644.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.07V24H8V8z" />
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    ),
  },
];

const hazardStripe = {
  backgroundImage:
    "repeating-linear-gradient(45deg, #d9f95f 0 16px, #0f1f14 16px 32px)",
};

function ColumnHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <h2 className="mb-5 flex items-center gap-2.5 text-base font-semibold text-white">
      <Icon aria-hidden className="size-5 shrink-0 text-[#d9f95f]" />
      {children}
    </h2>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#d9f95f]"
    >
      <ChevronRightIcon
        aria-hidden
        className="size-4 shrink-0 text-[#d9f95f]"
      />
      {label}
    </Link>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="bg-[#0f1f14] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr_1fr_1.4fr] lg:gap-x-0 lg:gap-y-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Link
              href="/"
              aria-label="Rentora home"
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#d9f95f] text-[#0f1f14]">
                <HardHatIcon aria-hidden className="size-5" />
              </span>
              <span className="text-3xl leading-none font-bold tracking-tight">
                Rent<span className="text-[#d9f95f]">ora</span>
              </span>
            </Link>

            <p className="mt-4 text-sm font-medium italic text-white/90">
              Rent the right equipment. Get the job done.
            </p>
            <div aria-hidden className="mt-3 h-0.5 w-14 rounded-full bg-[#d9f95f]" />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              We connect equipment owners with customers, making rentals easy,
              secure and affordable.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#d9f95f] hover:text-[#0f1f14] focus-visible:ring-3 focus-visible:ring-[#d9f95f]/50 focus-visible:outline-none"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="size-4 fill-current"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:border-l lg:border-white/10 lg:px-7">
            <ColumnHeading icon={LinkIcon}>Quick Links</ColumnHeading>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment Categories */}
          <div className="lg:border-l lg:border-white/10 lg:px-7">
            <ColumnHeading icon={LayoutGridIcon}>
              Equipment Categories
            </ColumnHeading>
            <ul className="space-y-3">
              {equipmentCategories.map((category) => (
                <li key={category}>
                  <FooterLink href="/all-equipment" label={category} />
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:border-l lg:border-white/10 lg:px-7">
            <ColumnHeading icon={HeadphonesIcon}>Support</ColumnHeading>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="lg:border-l lg:border-white/10 lg:pl-7">
            <ColumnHeading icon={MailIcon}>Stay Updated</ColumnHeading>

            <p className="text-sm leading-relaxed text-white/60">
              Get the latest updates, offers and rental tips.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
              <div className="relative">
                <MailIcon
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40"
                />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="h-11 rounded-lg border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/40 focus-visible:border-[#d9f95f]/60 focus-visible:ring-[#d9f95f]/30"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full gap-2 rounded-lg bg-[#d9f95f] px-6 text-sm font-semibold text-[#0f1f14] hover:bg-[#cdf24a] hover:text-[#0f1f14] focus-visible:border-[#0f1f14]/30 focus-visible:ring-[#0f1f14]/30"
              >
                Subscribe
                <ArrowRightIcon aria-hidden className="size-4" />
              </Button>

              <p
                aria-live="polite"
                className={cn(
                  "text-xs",
                  status === "success" && "text-[#d9f95f]",
                  status === "error" && "text-red-400",
                )}
              >
                {status === "success" &&
                  "You're on the list — thanks for subscribing!"}
                {status === "error" && "Please enter your email address."}
              </p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-5 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#d9f95f]">Rentora</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-sm text-white/60 transition-colors hover:text-[#d9f95f]"
            >
              Privacy Policy
            </Link>
            <span aria-hidden className="h-4 w-px bg-white/20" />
            <Link
              href="/about"
              className="text-sm text-white/60 transition-colors hover:text-[#d9f95f]"
            >
              Terms of Service
            </Link>

            <Button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 size-9 shrink-0 rounded-lg bg-[#d9f95f] p-0 text-[#0f1f14] hover:bg-[#cdf24a] hover:text-[#0f1f14] focus-visible:border-[#0f1f14]/30 focus-visible:ring-[#0f1f14]/30"
            >
              <ArrowUpIcon aria-hidden className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hazard stripe */}
      <div aria-hidden className="h-4 w-full sm:h-5" style={hazardStripe} />
    </footer>
  );
}
