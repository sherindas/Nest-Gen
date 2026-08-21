import { z } from "zod";
import { isValidMobile, isValidEmail } from "@/lib/validation";

/**
 * Zod schema for Service Request form submissions.
 * Used for both client-side validation (react-hook-form) and
 * server-side validation in the /api/service-request route.
 */
export const serviceRequestSchema = z.object({
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

  /** Service being requested — required; auto-populated on service detail pages */
  service: z.string().min(1, "Service is required"),

  /** Nature of the request */
  requirementType: z.string().min(1, "Requirement type is required"),

  /** Customer's location — required */
  location: z.string().min(1, "Location is required"),

  /** Preferred date for the service — optional */
  preferredDate: z.string().optional(),

  /** Detailed description of the requirement — required */
  description: z.string().min(1, "Description is required"),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;
