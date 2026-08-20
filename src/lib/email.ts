import { Resend } from "resend";

/**
 * Sends an HTML email notification with form submission details.
 * Notification recipient defaults to Sharonsmoki60@gmail.com.
 *
 * @param subject  - Email subject line
 * @param htmlBody - HTML content of the email body
 */
export async function sendNotification(
  subject: string,
  htmlBody: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL || "Sharonsmoki60@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  console.log(`[Email Dispatch] Sending "${subject}" to ${notificationEmail}`);

  if (!apiKey) {
    console.log(
      `[Email Notification Simulation] To: ${notificationEmail}\nSubject: ${subject}\nBody:\n${htmlBody}`
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error("[Email Notification Error]:", error);
    } else {
      console.log("[Email Notification Sent]:", data?.id);
    }
  } catch (err) {
    console.error("[Email Notification Exception]:", err);
  }
}
