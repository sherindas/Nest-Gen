import { z } from "zod";

/**
 * Zod schema for Sales Enquiry form submissions.
 * Used for both client-side validation (react-hook-form) and
 * server-side validation in the /api/sales-enquiry route.
 */
export const salesEnquirySchema = z.object({
  /** Customer's name — required */
  name: z.string().min(1, "Name is required"),

  /** 10-digit mobile number — required */
  mobile: z.string().min(10, "Valid mobile number required"),

  /** Email address — optional */
  email: z.string().email("Invalid email address").optional().or(z.literal("")),

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
