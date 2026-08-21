import { z } from "zod";
import { isValidMobile, isValidEmail } from "@/lib/validation";

/**
 * Zod schema for Sales Enquiry form submissions.
 * Used for both client-side validation (react-hook-form) and
 * server-side validation in the /api/sales-enquiry route.
 */
export const salesEnquirySchema = z.object({
  /** Customer's name — required */
  name: z.string().min(1, "Name is required"),

  /** 10-digit mobile number — required */
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .refine(
      (val) => isValidMobile(val),
      { message: "Please enter a valid 10-digit mobile number (e.g. 98765 43210)" }
    ),

  /** Email address — optional, but must be valid if provided */
  email: z
    .string()
    .optional()
    .refine(
      (val) => isValidEmail(val),
      { message: "Please enter a valid email address (e.g. name@example.com)" }
    ),

  /** Product or service the customer is enquiring about — optional */
  productServiceRequirement: z.string().optional(),

  /** Quantity required — optional */
  quantity: z.string().optional(),

  /** Customer's location — optional */
  location: z.string().optional(),

  /** Additional message or notes — optional */
  message: z.string().optional(),
});

export type SalesEnquiryFormData = z.infer<typeof salesEnquirySchema>;
