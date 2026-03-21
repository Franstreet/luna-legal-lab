"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type ContactFormProps = {
  content: Dictionary["contact"]["form"];
};

export function ContactForm({ content }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-medium text-white/78">
          {content.nameLabel}
          <input
            type="text"
            name="name"
            required
            placeholder={content.namePlaceholder}
            className="mt-3 w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/40 focus:border-secondary focus:bg-white/10"
          />
        </label>

        <label className="block text-sm font-medium text-white/78">
          {content.emailLabel}
          <input
            type="email"
            name="email"
            required
            placeholder={content.emailPlaceholder}
            className="mt-3 w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/40 focus:border-secondary focus:bg-white/10"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-white/78">
        {content.messageLabel}
        <textarea
          name="message"
          rows={6}
          required
          placeholder={content.messagePlaceholder}
          className="mt-3 w-full rounded-[1.5rem] border border-white/12 bg-white/6 px-4 py-3.5 text-base text-white outline-none placeholder:text-white/40 focus:border-secondary focus:bg-white/10"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-4 text-base font-semibold text-primary hover:-translate-y-0.5 hover:bg-[#ffd8bc]"
        >
          {content.submit}
        </button>

        <p className="text-sm leading-6 text-white/52">{content.helperText}</p>
      </div>

      {submitted ? (
        <p
          aria-live="polite"
          className="rounded-2xl border border-secondary/30 bg-secondary/12 px-4 py-3 text-sm text-secondary"
        >
          {content.successMessage}
        </p>
      ) : null}
    </form>
  );
}
