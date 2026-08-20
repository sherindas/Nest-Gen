/**
 * Shared TypeScript interfaces for NextGen Service Website
 */

// ─────────────────────────────────────────────────────────────────────────────
// Service data types
// ─────────────────────────────────────────────────────────────────────────────

/** A single service offered by NextGen Service */
export interface ServiceDefinition {
  /** URL-safe kebab-case identifier used for routing (/services/{slug}) */
  slug: string;
  /** Human-readable display name */
  name: string;
  /** Category grouping for filtering */
  category: "electrical" | "plumbing-motors" | "security" | "automation";
  /** Optional badge text like "Popular", "Same Day", "Sales & Service" */
  badge?: string;
  /** Icon key identifier */
  iconKey?: string;
  /** Short description shown on the homepage Service Card */
  shortDescription: string;
  /** Detailed description shown on the Service Detail Page "About" section */
  longDescription: string;
  /** URL for the service card and hero image */
  imageUrl: string;
  /** Whether this service includes a Sales section (products/equipment sold) */
  hasSales: boolean;
  /** Products or equipment sold (only relevant when hasSales is true) */
  salesItems?: string[];
  /** Installation, maintenance, or repair services provided */
  serviceItems: string[];
  /** Whether the service should include a pre-filled WhatsApp CTA */
  hasWhatsApp: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component prop types
// ─────────────────────────────────────────────────────────────────────────────

/** Props for the ServiceCard component */
export interface ServiceCardProps {
  name: string;
  slug: string;
  category?: "electrical" | "plumbing-motors" | "security" | "automation";
  badge?: string;
  iconKey?: string;
  description: string;
  imageUrl: string;
  serviceItems?: string[];
  /** Controls whether the "Sales Enquiry" button is rendered */
  hasSalesEnquiry: boolean;
}

/** Shared optional prop for pre-populating the service field in forms */
export interface ServiceRequestFormProps {
  defaultService?: string;
}

export interface SalesEnquiryFormProps {
  defaultService?: string;
}

export interface ComplaintFormProps {
  defaultService?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// API response types
// ─────────────────────────────────────────────────────────────────────────────

export interface ApiSuccessResponse {
  success: true;
  submissionId?: string;
  enquiryId?: string;
  complaintId?: string;
}

export interface ApiErrorResponse {
  success: false;
  errors: Record<string, string[]>;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
