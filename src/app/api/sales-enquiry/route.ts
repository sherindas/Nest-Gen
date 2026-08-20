import { NextResponse } from "next/server";
import { salesEnquirySchema } from "@/schemas/salesEnquiry";
import { appendRow } from "@/lib/sheets";
import { sendNotification } from "@/lib/email";
import { generateSalesEnquiryId } from "@/lib/ids";

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

  const result = salesEnquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const {
    name,
    mobile,
    email,
    productServiceRequirement,
    quantity,
    location,
    message,
  } = result.data;

  const id = generateSalesEnquiryId();
  const timestamp = new Date().toISOString();

  // Sheets row data
  const row: (string | number | null)[] = [
    id,
    timestamp,
    name,
    mobile,
    email || "",
    "Sales Enquiry",
    productServiceRequirement || "",
    quantity || "",
    location || "",
    message || "",
    "New",
    "",
    "",
    timestamp,
  ];

  // Email notification HTML template
  const subject = `[NextGen Sales Enquiry] ${productServiceRequirement || "Equipment"} — ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">New Equipment Sales Quotation Request</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 35%; color: #475569;">Enquiry ID:</td><td style="padding: 8px; color: #0f172a;">${id}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Customer / Company:</td><td style="padding: 8px; color: #0f172a;">${name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Mobile Number:</td><td style="padding: 8px; color: #0f172a;"><a href="tel:${mobile}">${mobile}</a></td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px; color: #0f172a;">${email || "Not provided"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Product / Hardware:</td><td style="padding: 8px; color: #0f172a; font-weight: bold;">${productServiceRequirement || "General"}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Quantity / Capacity:</td><td style="padding: 8px; color: #0f172a;">${quantity || "1 Unit"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Delivery Location:</td><td style="padding: 8px; color: #0f172a;">${location || "Not specified"}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Specifications / Note:</td><td style="padding: 8px; color: #0f172a;">${message || "N/A"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Submitted At:</td><td style="padding: 8px; color: #0f172a;">${timestamp}</td></tr>
      </table>
    </div>
  `;

  // Asynchronously execute sheets and email notifications without blocking client response
  Promise.allSettled([
    appendRow("Sales Enquiries", row),
    sendNotification(subject, html),
  ]).catch((err) => {
    console.error("Background task error:", err);
  });

  // Return immediately (<50ms)
  return NextResponse.json({ success: true, enquiryId: id }, { status: 200 });
}
