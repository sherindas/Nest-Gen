import { v4 as uuidv4 } from "uuid";

/**
 * Formats the current date as YYYYMMDD for use in generated IDs.
 */
function getDateSegment(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * Generates a 6-character random alphanumeric segment derived from a UUID.
 * Uses the first 6 hex characters of a UUID v4, uppercased.
 */
function getRandomSegment(): string {
  // Strip hyphens from a UUID and take the first 6 characters
  return uuidv4().replace(/-/g, "").substring(0, 6).toUpperCase();
}

/**
 * Generates a unique Service Request ID.
 * Format: SR-{YYYYMMDD}-{RANDOM6}
 * Example: SR-20240115-3A7F2C
 */
export function generateServiceRequestId(): string {
  return `SR-${getDateSegment()}-${getRandomSegment()}`;
}

/**
 * Generates a unique Sales Enquiry ID.
 * Format: SE-{YYYYMMDD}-{RANDOM6}
 * Example: SE-20240115-9B1D4E
 */
export function generateSalesEnquiryId(): string {
  return `SE-${getDateSegment()}-${getRandomSegment()}`;
}

/**
 * Generates a unique Complaint ID.
 * Format: CP-{YYYYMMDD}-{RANDOM6}
 * Example: CP-20240115-F5A2C8
 */
export function generateComplaintId(): string {
  return `CP-${getDateSegment()}-${getRandomSegment()}`;
}
