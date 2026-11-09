import { siteConfig } from "@/config/site";

export type ContactPayload = {
  fullName: string;
  organization?: string;
  email: string;
  phone: string;
  division: string;
  message: string;
  honeypot?: string;
};

export type SubmitResult =
  | { status: "success"; mode: "endpoint" | "formsubmit" | "mailto" }
  | { status: "error"; message: string };

type FormMode = "endpoint" | "formsubmit" | "mailto";

const configuredMode = process.env.NEXT_PUBLIC_FORM_MODE;

/**
 * FormSubmit.co endpoint. Keep the recipient inbox in `.env.local`, never in
 * page copy. After the first activation email, FormSubmit sends a random
 * alias; use `https://formsubmit.co/ajax/<alias>` here to hide the address
 * from the public bundle and network requests.
 */
const formsubmitEndpoint =
  process.env.NEXT_PUBLIC_FORMSUBMIT_ENDPOINT ?? "";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const formMode: FormMode =
  configuredMode === "mailto" || configuredMode === "endpoint"
    ? configuredMode
    : formsubmitEndpoint
      ? "formsubmit"
      : "mailto";

function buildMailto(payload: ContactPayload): string {
  const subject = `Website inquiry — ${payload.division}`;
  const body = [
    `Full name: ${payload.fullName}`,
    `Organization: ${payload.organization || "—"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Division of interest: ${payload.division}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

async function submitToFormSubmit(
  payload: ContactPayload,
): Promise<SubmitResult> {
  if (!formsubmitEndpoint) {
    return { status: "error", message: "missing-endpoint" };
  }

  try {
    const response = await fetch(formsubmitEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.fullName,
        organization: payload.organization || "—",
        email: payload.email,
        phone: payload.phone,
        division: payload.division,
        message: payload.message,
        // Reply goes straight to the visitor, not to the form service.
        _replyto: payload.email,
        _subject: `Website inquiry — ${payload.division}`,
        _template: "table",
        _captcha: "false",
        _honey: payload.honeypot ?? "",
        source: siteConfig.domain,
      }),
    });

    if (!response.ok) {
      return { status: "error", message: `http-${response.status}` };
    }

    const data = (await response.json().catch(() => null)) as
      | { success?: string | boolean }
      | null;

    if (data && (data.success === false || data.success === "false")) {
      return { status: "error", message: "submission-rejected" };
    }

    return { status: "success", mode: "formsubmit" };
  } catch {
    return { status: "error", message: "network" };
  }
}

/**
 * Submit the contact form.
 *
 * - `NEXT_PUBLIC_FORM_MODE=formsubmit` posts JSON to FormSubmit.co, which
 *   emails the configured inbox without exposing it in page copy.
 * - `NEXT_PUBLIC_FORM_MODE=endpoint` posts JSON to
 *   `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree or `public/api/contact.php`).
 * - anything else opens a prefilled mailto link (no backend required).
 */
export async function submitContactForm(
  payload: ContactPayload,
): Promise<SubmitResult> {
  if (payload.honeypot) {
    return { status: "error", message: "honeypot" };
  }

  if (formMode === "formsubmit") {
    return submitToFormSubmit(payload);
  }

  if (formMode === "endpoint") {
    if (!endpoint) {
      return { status: "error", message: "missing-endpoint" };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          honeypot: payload.honeypot ?? "",
          source: siteConfig.domain,
        }),
      });

      if (!response.ok) {
        return { status: "error", message: `http-${response.status}` };
      }

      return { status: "success", mode: "endpoint" };
    } catch {
      return { status: "error", message: "network" };
    }
  }

  window.location.href = buildMailto(payload);
  return { status: "success", mode: "mailto" };
}

export const activeFormMode: FormMode = formMode;
