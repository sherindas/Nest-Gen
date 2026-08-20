import { NextResponse } from "next/server";
import { complaintSchema } from "@/schemas/complaint";
import { appendRow } from "@/lib/sheets";
import { sendNotification } from "@/lib/email";
import { generateComplaintId } from "@/lib/ids";

export async function POST(request: Request) {
  let data: Record<string, unknown> = {};

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, errors: "Invalid JSON body" },
        { status: 400 }
      );
    }
  } else {
    try {
      const formData = await request.formData();
      data = {
        fullName: formData.get("fullName"),
        mobile: formData.get("mobile"),
        email: formData.get("email") || undefined,
        serviceProduct: formData.get("serviceProduct"),
        complaintType: formData.get("complaintType"),
        invoiceReference: formData.get("invoiceReference") || undefined,
        location: formData.get("location"),
        complaintDescription: formData.get("complaintDescription"),
      };
    } catch {
      return NextResponse.json(
        { success: false, errors: "Invalid form data" },
        { status: 400 }
      );
    }
  }

  const result = complaintSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const validatedData = result.data;
  const id = generateComplaintId();
  const timestamp = new Date().toISOString();

  // Sheets row data
  const row: (string | number | null)[] = [
    id,
    timestamp,
    validatedData.fullName,
    validatedData.mobile,
    validatedData.email || "",
    validatedData.serviceProduct,
    validatedData.complaintType,
    validatedData.invoiceReference || "",
    validatedData.location,
    validatedData.complaintDescription,
    "",
    "New",
    "",
    "",
    timestamp,
  ];

  // Email notification HTML template
  const subject = `[NextGen Support] New Ticket: ${validatedData.complaintType} — ${validatedData.fullName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">NextGen Warranty & Support Ticket</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 35%; color: #475569;">Ticket ID:</td><td style="padding: 8px; color: #0f172a;">${id}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Customer Name:</td><td style="padding: 8px; color: #0f172a;">${validatedData.fullName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Mobile Number:</td><td style="padding: 8px; color: #0f172a;"><a href="tel:${validatedData.mobile}">${validatedData.mobile}</a></td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px; color: #0f172a;">${validatedData.email || "Not provided"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Service / Product:</td><td style="padding: 8px; color: #0f172a;">${validatedData.serviceProduct}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Complaint Type:</td><td style="padding: 8px; color: #0f172a;">${validatedData.complaintType}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Location / Address:</td><td style="padding: 8px; color: #0f172a;">${validatedData.location}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Invoice / Reference:</td><td style="padding: 8px; color: #0f172a;">${validatedData.invoiceReference || "N/A"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Issue Description:</td><td style="padding: 8px; color: #0f172a;">${validatedData.complaintDescription}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Timestamp:</td><td style="padding: 8px; color: #0f172a;">${timestamp}</td></tr>
      </table>
    </div>
  `;

  // Asynchronously execute sheets and email notifications without blocking client response
  Promise.allSettled([
    appendRow("Complaints", row),
    sendNotification(subject, html),
  ]).catch((err) => {
    console.error("Background task error:", err);
  });

  // Return immediately (<50ms)
  return NextResponse.json({ success: true, complaintId: id }, { status: 200 });
}
