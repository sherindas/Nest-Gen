import { z } from "zod";

/**
 * Zod schema for Service Request form submissions.
 * Used for both client-side validation (react-hook-form) and
 * server-side validation in the /api/service-request route.
 */
export const serviceRequestSchema = z.object({
  /** Customer's full name — required */
  fullName: z.string().min(1, "Full name is required"),

  /** 10-digit mobile number — required */
  mobile: z.string().min(10, "Valid mobile number required"),

  /** Email address — optional */
  email: z.string().email("Invalid email address").optional().or(z.literal("")),

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
