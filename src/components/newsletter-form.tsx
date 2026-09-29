"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";

// Not connected to an email provider yet: the form only confirms locally.
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="mt-6 text-body">Thank you. You&apos;re on the list.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="mt-6 flex items-center border-b border-line-inverse"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Email"
        className="flex-1 bg-transparent pt-4 pb-2 text-body font-thin placeholder:text-paper/70 focus:outline-none"
      />
      <button type="submit" aria-label="Subscribe" className="cursor-pointer p-2">
        <ChevronIcon className="size-4" />
      </button>
    </form>
  );
}
