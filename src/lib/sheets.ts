import { google } from "googleapis";

/**
 * Appends a row of values to the specified sheet in the configured
 * Google Spreadsheet asynchronously without blocking.
 */
export async function appendRow(
  sheetName: string,
  values: (string | number | null)[]
): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !email || !key) {
    console.log(
      `[Google Sheets skipped] Google Sheets credentials not configured. Row data:`,
      values
    );
    return;
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key: key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    });
    console.log(`[Google Sheets] Row appended successfully to "${sheetName}"`);
  } catch (err) {
    console.error(`[Google Sheets Error] Failed to append to "${sheetName}":`, err);
  }
}
