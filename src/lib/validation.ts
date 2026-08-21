/**
 * Validation utilities for phone numbers and email addresses.
 */

/**
 * Validates a mobile number.
 * Supports 10-digit Indian numbers starting with 6, 7, 8, 9,
 * with optional +91, 91, or leading 0 prefixes, plus spaces or dashes.
 */
export function isValidMobile(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return /^[6-9]\d{9}$/.test(digits.slice(1));
  }
  return /^[6-9]\d{9}$/.test(digits);
}

/**
 * Validates an email address.
 * Empty or undefined strings return true (since email is optional in forms).
 * If provided, must match standard RFC 5322-compatible email format.
 */
export function isValidEmail(email?: string | null): boolean {
  if (!email || !email.trim()) return true;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email.trim());
}
