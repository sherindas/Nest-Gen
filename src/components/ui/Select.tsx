"use client";

import React, { useId } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  /** Visible label rendered above the select */
  label?: string;
  /** Array of selectable options */
  options: SelectOption[];
  /** Placeholder text rendered as the first, disabled option */
  placeholder?: string;
  /** Error message — renders below select and triggers error styling */
  error?: string;
  /** Optional explicit id; auto-generated when omitted */
  id?: string;
  hint?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Select component
// ─────────────────────────────────────────────────────────────────────────────

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
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

    const selectClasses = [
      "block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white shadow-sm",
      "focus:outline-none focus:ring-4 transition-all duration-200",
      "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
      "appearance-none cursor-pointer pr-10",
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
          <select
            ref={ref}
            {...props}
            id={id}
            required={required}
            disabled={disabled}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? errorId : undefined}
            aria-required={required}
            className={selectClasses}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom chevron icon */}
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
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

Select.displayName = "Select";

export default Select;
