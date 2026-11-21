import type { Metadata } from "next"
import { ClockIcon, MailIcon, MapPinIcon } from "lucide-react"

import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Rentora team.",
}

const details = [
  {
    icon: MailIcon,
    title: "Email",
    value: "support@rentora.com",
    href: "mailto:support@rentora.com",
  },
  {
    icon: MapPinIcon,
    title: "Office",
    value: "500 Congress Ave, Austin, TX",
    href: undefined,
  },
  {
    icon: ClockIcon,
    title: "Support hours",
    value: "Mon–Fri, 9:00–18:00 CST",
    href: undefined,
  },
]

export default function Page() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:py-20">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Contact
          </p>

          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl">
            We&apos;d love to hear from you
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Questions about a booking, a listing or your account? Send us a
            message and we&apos;ll get back to you.
          </p>

          <ul className="mt-8 space-y-4">
            {details.map((detail) => (
              <li
                key={detail.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <detail.icon
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {detail.title}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {detail.value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
