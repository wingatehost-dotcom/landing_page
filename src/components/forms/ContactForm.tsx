"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { localePath } from "@/config/site";
import type { Content } from "@/content/types";
import { submitContactForm } from "@/lib/submitForm";

type DivisionOption = {
  slug: string;
  name: string;
};

type ContactFormProps = {
  lang: string;
  content: Content["form"];
  divisions: readonly DivisionOption[];
  optionalLabel: string;
  privacyNote: string;
  backToHome: string;
};

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; mode: "endpoint" | "formsubmit" | "mailto" }
  | { state: "error" };

function createSchema(errors: Content["form"]["errors"]) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(1, { error: errors.fullNameRequired })
      .min(2, { error: errors.fullNameShort }),
    organization: z.string().trim().max(160).optional().or(z.literal("")),
    email: z
      .string()
      .trim()
      .min(1, { error: errors.emailRequired })
      .pipe(z.email({ error: errors.emailInvalid })),
    phone: z
      .string()
      .trim()
      .min(1, { error: errors.phoneRequired })
      .regex(/^[0-9+()\-\s]{7,20}$/, { error: errors.phoneInvalid }),
    division: z.string().min(1, { error: errors.divisionRequired }),
    message: z
      .string()
      .trim()
      .min(1, { error: errors.messageRequired })
      .min(10, { error: errors.messageShort }),
    /** Honeypot — must stay empty. */
    website: z.string().max(0).optional().or(z.literal("")),
  });
}

type FormValues = z.infer<ReturnType<typeof createSchema>>;

const inputBase =
  "mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-primary shadow-sm transition-colors placeholder:text-primary/70 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/25";

export function ContactForm({
  lang,
  content,
  divisions,
  optionalLabel,
  privacyNote,
  backToHome,
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  const schema = useMemo(() => createSchema(content.errors), [content.errors]);

  const divisionOptions = useMemo(
    () => [
      { value: "general", label: content.labels.divisionGeneral },
      ...divisions.map((division) => ({
        value: division.slug,
        label: division.name,
      })),
    ],
    [content.labels.divisionGeneral, divisions],
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      organization: "",
      email: "",
      phone: "",
      division: "general",
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    const requested = searchParams.get("division");
    if (!requested) return;
    const match = divisionOptions.find((option) => option.value === requested);
    if (match) setValue("division", match.value);
  }, [divisionOptions, searchParams, setValue]);

  const onSubmit = async (values: FormValues) => {
    setStatus({ state: "submitting" });
    const result = await submitContactForm({
      fullName: values.fullName,
      organization: values.organization || undefined,
      email: values.email,
      phone: values.phone,
      division: values.division,
      message: values.message,
      honeypot: values.website || undefined,
    });

    if (result.status === "success") {
      setStatus({ state: "success", mode: result.mode });
      reset({ division: values.division });
      return;
    }

    setStatus({ state: "error" });
  };

  const fieldClass = (hasError: boolean) =>
    `${inputBase} ${hasError ? "border-third" : "border-primary/15"}`;

  const errorText = (message: string | undefined, id: string) =>
    message ? (
      <p id={id} role="alert" className="mt-1.5 text-xs font-semibold text-primary">
        {message}
      </p>
    ) : null;

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center rounded-xl border border-secondary/25 bg-secondary/5 p-8 shadow-soft sm:p-10"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
          <CheckCircle2 aria-hidden className="h-6 w-6" />
        </span>
        <p className="mt-5 text-lg font-semibold leading-snug text-primary">
          {status.mode === "mailto"
            ? content.status.mailtoSuccess
            : content.status.success}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setStatus({ state: "idle" })}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            {content.labels.submit}
          </button>
          <Link
            href={localePath(lang, "/")}
            className="rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary/40"
          >
            {backToHome}
          </Link>
        </div>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-xl border border-primary/10 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="fullName" className="text-sm font-semibold text-primary">
            {content.labels.fullName} <span aria-hidden>*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder={content.placeholders.fullName}
            aria-required="true"
            aria-invalid={errors.fullName ? "true" : undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={fieldClass(Boolean(errors.fullName))}
            {...register("fullName")}
          />
          {errorText(errors.fullName?.message, "fullName-error")}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="organization" className="text-sm font-semibold text-primary">
            {content.labels.organization}{" "}
            <span className="font-normal text-primary/70">({optionalLabel})</span>
          </label>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            placeholder={content.placeholders.organization}
            className={fieldClass(false)}
            {...register("organization")}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="text-sm font-semibold text-primary">
            {content.labels.email} <span aria-hidden>*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={content.placeholders.email}
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass(Boolean(errors.email))}
            {...register("email")}
          />
          {errorText(errors.email?.message, "email-error")}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="phone" className="text-sm font-semibold text-primary">
            {content.labels.phone} <span aria-hidden>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={content.placeholders.phone}
            aria-required="true"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldClass(Boolean(errors.phone))}
            {...register("phone")}
          />
          {errorText(errors.phone?.message, "phone-error")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="division" className="text-sm font-semibold text-primary">
            {content.labels.division} <span aria-hidden>*</span>
          </label>
          <select
            id="division"
            aria-required="true"
            aria-invalid={errors.division ? "true" : undefined}
            aria-describedby={errors.division ? "division-error" : undefined}
            className={fieldClass(Boolean(errors.division))}
            {...register("division")}
          >
            <option value="" disabled>
              {content.labels.divisionPlaceholder}
            </option>
            {divisionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errorText(errors.division?.message, "division-error")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold text-primary">
            {content.labels.message} <span aria-hidden>*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={content.placeholders.message}
            aria-required="true"
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${fieldClass(Boolean(errors.message))} resize-y`}
            {...register("message")}
          />
          {errorText(errors.message?.message, "message-error")}
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status.state === "error" ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-third bg-third/10 p-4 text-sm text-primary"
        >
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{content.status.error}</p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-primary/70">
          {privacyNote}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-third px-7 py-3.5 text-sm font-semibold text-primary shadow-soft transition-all duration-300 hover:bg-third/90 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
          ) : (
            <Send aria-hidden className="h-4 w-4" />
          )}
          {submitting ? content.labels.submitting : content.labels.submit}
        </button>
      </div>
    </form>
  );
}
