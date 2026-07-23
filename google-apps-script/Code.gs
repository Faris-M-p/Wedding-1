/**
 * RSVP → Google Sheets (Apps Script Web App)
 * ------------------------------------------------------------------
 * SETUP
 *   1. Create a Google Sheet (this will hold the responses).
 *   2. Extensions ▸ Apps Script — delete any code and paste this file.
 *   3. Click Deploy ▸ New deployment ▸ type "Web app".
 *        - Description: RSVP endpoint
 *        - Execute as:   Me
 *        - Who has access: Anyone
 *   4. Authorise when prompted, then copy the Web app URL (…/exec).
 *   5. In the website put that URL in .env.local:
 *        NEXT_PUBLIC_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
 *
 * The sheet columns are created automatically on first submission:
 *   Timestamp | Full Name | Phone Number | Guest Count | Attendance | Device | Submitted At
 * ------------------------------------------------------------------
 */

var SHEET_NAME = "RSVPs";
var HEADERS = [
  "Timestamp",
  "Full Name",
  "Phone Number",
  "Guest Count",
  "Attendance",
  "Device",
  "Submitted At",
];

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    var name = String(payload.name || "").trim();
    var phone = String(payload.phone || "").trim();
    var guestCount = parseInt(payload.guestCount, 10);
    var attendance = String(payload.attendance || "").trim().toLowerCase();
    var device = String(payload.device || "Unknown").trim();
    var submittedAt = String(payload.submittedAt || "").trim();

    // ---- Validation (mirrors the client) ----
    var digits = (phone.match(/\d/g) || []).length;
    if (!name) return json({ success: false, error: "Name is required." });
    if (!phone || digits < 7 || digits > 15) {
      return json({ success: false, error: "Valid phone number is required." });
    }
    if (isNaN(guestCount) || guestCount < 1) {
      return json({ success: false, error: "Guest count must be at least 1." });
    }
    if (attendance !== "accept" && attendance !== "decline") {
      return json({ success: false, error: "Attendance is required." });
    }

    var attendanceLabel = attendance === "accept" ? "Accept" : "Decline";

    var sheet = getSheet();
    var tz = Session.getScriptTimeZone();
    var timestamp = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
      timestamp,
      name,
      phone,
      guestCount,
      attendanceLabel,
      device,
      submittedAt,
    ]);

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

function doGet() {
  // Simple health check for the deployment URL.
  return json({ success: true, status: "RSVP endpoint is live." });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
