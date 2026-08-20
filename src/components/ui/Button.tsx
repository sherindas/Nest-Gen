"use client";

import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark" | "outline" | "white";
type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** When true, renders children directly (for wrapping Next.js <Link> etc.) */
  asChild?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant & size class maps
// ─────────────────────────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] border border-orange-400/30 disabled:opacity-60",
  secondary:
    "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 hover:border-orange-300 focus:ring-orange-500 disabled:opacity-60",
  outline:
    "bg-transparent text-gray-800 border border-slate-300 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/50 focus:ring-orange-500 disabled:opacity-60",
  ghost:
    "bg-transparent text-gray-700 hover:bg-slate-100 hover:text-orange-600 focus:ring-slate-400 disabled:opacity-60",
  dark:
    "bg-slate-900 text-white hover:bg-slate-800 border border-slate-800 shadow-md active:scale-[0.98] focus:ring-slate-500 disabled:opacity-60",
  white:
    "bg-white text-gray-900 hover:bg-gray-50 shadow-md hover:shadow-lg border border-slate-200 focus:ring-orange-500 active:scale-[0.98] disabled:opacity-60",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs font-semibold rounded-lg",
  md: "px-5 py-2.5 text-sm font-semibold rounded-xl",
  lg: "px-6 py-3.5 text-base font-semibold rounded-xl",
  xl: "px-8 py-4 text-lg font-bold rounded-2xl",
};

// ─────────────────────────────────────────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
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
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Button component
// ─────────────────────────────────────────────────────────────────────────────

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  asChild = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed select-none";

  const classes = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = disabled || loading;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      className: [
        (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.className ?? "",
        classes,
      ]
        .filter(Boolean)
        .join(" "),
    });
  }

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={classes}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export default Button;
