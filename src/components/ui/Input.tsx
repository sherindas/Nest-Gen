"use client";

import React, { useId } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Visible label rendered above the input */
  label?: string;
  /** Error message — renders below input and triggers error styling */
  error?: string;
  /** Optional explicit id; auto-generated when omitted */
  id?: string;
  /** Helper subtext */
  hint?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Input component
// ─────────────────────────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      id: externalId,
      className = "",
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const errorId = `${id}-error`;
    const hasError = Boolean(error);

    const inputClasses = [
      "block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white placeholder-slate-400",
      "shadow-sm transition-all duration-200",
      "focus:outline-none focus:ring-4",
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
        <div className="relative">
          <input
            ref={ref}
            {...props}
            id={id}
            required={required}
            disabled={disabled}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? errorId : undefined}
            aria-required={required}
            className={inputClasses}
          />
        </div>
        {hasError && (
          <p id={errorId} role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
