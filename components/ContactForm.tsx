"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type ContactFormProps = {
  content: Dictionary["contact"]["form"];
};

const inputClass =
  "peer w-full rounded-2xl border border-white/12 bg-white/6 px-4 pt-6 pb-2 text-base text-white outline-none transition-colors focus:border-secondary focus:bg-white/10";

const labelClass =
  "pointer-events-none absolute left-4 top-2 text-xs font-medium text-white/45 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/45 peer-focus:top-2 peer-focus:text-xs peer-focus:text-secondary";

export function ContactForm({ content }: ContactFormProps) {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setTimeout(() => {
      form.reset();
      setSending(false);
      setSubmitted(true);
    }, 1500);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            placeholder=" "
            className={inputClass}
          />
          <label htmlFor="contact-name" className={labelClass}>
            {content.nameLabel}
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            placeholder=" "
            className={inputClass}
          />
          <label htmlFor="contact-email" className={labelClass}>
            {content.emailLabel}
          </label>
        </div>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder=" "
          className="peer w-full rounded-3xl border border-white/12 bg-white/6 px-4 pt-8 pb-3 text-base text-white outline-none transition-colors focus:border-secondary focus:bg-white/10"
        />
        <label
          htmlFor="contact-message"
          className="pointer-events-none absolute left-4 top-3 text-xs font-medium text-white/45 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/45 peer-focus:top-3 peer-focus:text-xs peer-focus:text-secondary"
        >
          {content.messageLabel}
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-secondary px-7 py-4 text-base font-semibold text-primary shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-0.5 hover:bg-[#ffd8bc] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {sending ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {content.sending}
            </>
          ) : (
            content.submit
          )}
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
