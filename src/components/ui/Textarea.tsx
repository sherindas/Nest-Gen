"use client";

import React, { useId } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  /** Visible label rendered above the textarea */
  label?: string;
  /** Error message — renders below textarea and triggers error styling */
  error?: string;
  /** Optional explicit id; auto-generated when omitted */
  id?: string;
  hint?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Textarea component
// ─────────────────────────────────────────────────────────────────────────────

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      id: externalId,
      className = "",
      required,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const errorId = `${id}-error`;
    const hasError = Boolean(error);

    const textareaClasses = [
      "block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white placeholder-slate-400 shadow-sm",
      "focus:outline-none focus:ring-4 transition-all duration-200 resize-y",
      "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 text-red-900"
        : "border-slate-200 hover:border-slate-300 focus:border-orange-500 focus:ring-orange-500/15",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            <span>
              {label}
              {required && (
                <span className="ml-1 text-orange-600 font-bold" aria-hidden="true">
                  *
                </span>
              )}
            </span>
            {hint && <span className="text-[11px] font-normal text-slate-400 normal-case">{hint}</span>}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          id={id}
          rows={rows}
          required={required}
          disabled={disabled}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? errorId : undefined}
          aria-required={required}
          className={textareaClasses}
        />
        {hasError && (
          <p id={errorId} role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
