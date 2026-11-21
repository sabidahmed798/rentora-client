"use client"

import { useState } from "react"
import { CircleCheckIcon, SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const labelClasses = "mb-1.5 block text-sm font-medium text-foreground"

export function ContactForm() {
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
          Message sent
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out — our team usually replies within one
          business day.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-6 h-11 px-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder="What is this about?"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Tell us how we can help."
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 h-11 w-full gap-2 bg-[#103527] px-6 text-white hover:bg-[#0c2a1e] hover:text-white focus-visible:border-white/30 focus-visible:ring-white/30 sm:w-auto"
      >
        Send message
        <SendIcon aria-hidden className="size-4" />
      </Button>
    </form>
  )
}
