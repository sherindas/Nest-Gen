import { z } from "zod";
import { isValidMobile, isValidEmail } from "@/lib/validation";

/**
 * Zod schema for Complaint form submissions.
 * Used for both client-side validation (react-hook-form) and
 * server-side validation in the /api/complaint route.
 *
 * Note: The image file is validated separately (client-side via File API,
 * server-side via Content-Type + size checks) since Zod cannot inspect
 * File objects in all environments.
 */
export const complaintSchema = z.object({
  /** Customer's full name — required */
  fullName: z.string().min(1, "Full name is required"),

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

  /** Service or product the complaint relates to — required; auto-populated on service pages */
  serviceProduct: z.string().min(1, "Service/Product is required"),

  /** Category of the complaint */
  complaintType: z.string().min(1, "Complaint type is required"),

  /** Invoice or job reference number — optional */
  invoiceReference: z.string().optional(),

  /** Customer's location — required */
  location: z.string().min(1, "Location is required"),

  /** Detailed description of the complaint — required */
  complaintDescription: z.string().min(1, "Description is required"),
});

export type ComplaintFormData = z.infer<typeof complaintSchema>;
