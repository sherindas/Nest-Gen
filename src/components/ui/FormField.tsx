"use client";

import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface FormFieldProps {
  /** The form control(s) to wrap — typically Input, Select, or Textarea */
  children: React.ReactNode;
  /** Optional helper text rendered below the control (not shown when error is present) */
  hint?: string;
  /** Error message forwarded from validation; when set, hint is hidden */
  error?: string;
  /** Extra classes applied to the outer wrapper div */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// FormField component
//
// Acts as a layout wrapper that adds consistent spacing between form controls
// and provides a single place to display inline hint / error text when the
// child primitive (Input, Select, Textarea) does not render it itself.
//
// In most cases you can pass `error` and `label` directly to the individual
// primitives. Use FormField when you need an additional hint, want to group
// multiple related controls under a shared label, or need a consistent gap
// in the form grid layout.
// ─────────────────────────────────────────────────────────────────────────────

export function FormField({
  children,
  hint,
  error,
  className = "",
}: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <div className={["flex flex-col gap-1", className].filter(Boolean).join(" ")}>
      {children}
      {hasError ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default FormField;
