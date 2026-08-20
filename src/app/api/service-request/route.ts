import { NextResponse } from "next/server";
import { serviceRequestSchema } from "@/schemas/serviceRequest";
import { appendRow } from "@/lib/sheets";
import { sendNotification } from "@/lib/email";
import { generateServiceRequestId } from "@/lib/ids";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const result = serviceRequestSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const {
    fullName,
    mobile,
    email,
    service,
    requirementType,
    location,
    preferredDate,
    description,
  } = result.data;

  const id = generateServiceRequestId();
  const timestamp = new Date().toISOString();

  // 1. Sheets row data
  const row: (string | number | null)[] = [
    id,
    timestamp,
    fullName,
    mobile,
    email || "",
    service,
    requirementType,
    location,
    preferredDate || "",
    description,
    "New",
    "",
    "",
    timestamp,
  ];

  // 2. Email notification HTML template
  const subject = `[NextGen Service Booking] ${service} — ${fullName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">New Service Booking Request</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 35%; color: #475569;">Booking ID:</td><td style="padding: 8px; color: #0f172a;">${id}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Customer Name:</td><td style="padding: 8px; color: #0f172a;">${fullName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Mobile Number:</td><td style="padding: 8px; color: #0f172a;"><a href="tel:${mobile}">${mobile}</a></td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px; color: #0f172a;">${email || "Not provided"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Service Required:</td><td style="padding: 8px; color: #0f172a; font-weight: bold;">${service}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Requirement Type:</td><td style="padding: 8px; color: #0f172a;">${requirementType}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Service Location:</td><td style="padding: 8px; color: #0f172a;">${location}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Preferred Date:</td><td style="padding: 8px; color: #0f172a;">${preferredDate || "Immediate / Flexible"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Work Description:</td><td style="padding: 8px; color: #0f172a;">${description}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Submitted At:</td><td style="padding: 8px; color: #0f172a;">${timestamp}</td></tr>
      </table>
    </div>
  `;

  // Asynchronously execute sheets and email notifications without blocking client response
  Promise.allSettled([
    appendRow("Service Requests", row),
    sendNotification(subject, html),
  ]).catch((err) => {
    console.error("Background task error:", err);
  });

  // Return immediately (<50ms) for an instantaneous user response
  return NextResponse.json({ success: true, submissionId: id }, { status: 200 });
}
