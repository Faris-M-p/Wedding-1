/**
 * Wedding backend — RSVP + Guest Wishes
 * ------------------------------------------------------------------
 * ONE spreadsheet, TWO sheets, ONE Apps Script, ONE deployment URL.
 *
 *   Sheet1   → RSVP responses
 *              Timestamp | Name | Phone | Guest Count | Attendance | Device | Submitted At
 *   Wishes   → Guest blessings
 *              Timestamp | Name | Phone | Wish | Is Custom | Status
 *
 * SETUP
 *   1. Create ONE Google Sheet (its first tab is "Sheet1").
 *   2. Extensions ▸ Apps Script — delete any code and paste this file.
 *   3. Deploy ▸ New deployment ▸ Web app
 *        - Execute as:   Me
 *        - Who has access: Anyone
 *   4. Copy the Web app URL (…/exec) → NEXT_PUBLIC_RSVP_ENDPOINT in .env.local.
 *      (The website uses this single URL for both RSVP and Wishes.)
 *
 *   ⚠️  After editing this script, redeploy as a NEW VERSION
 *       (Deploy ▸ Manage deployments ▸ edit ✏️ ▸ Version: New version)
 *       so the changes go live on the same URL.
 *
 * MODERATION
 *   Every wish is saved with Status = "Pending".
 *   The couple changes Status in the Wishes sheet to:
 *       Approved  → shown on the website
 *       Rejected  → hidden
 *   Only "Approved" wishes are returned by GET ?action=wishes.
 * ------------------------------------------------------------------
 */

var RSVP_SHEET = "Sheet1";
var RSVP_HEADERS = [
  "Timestamp",
  "Name",
  "Phone",
  "Guest Count",
  "Attendance",
  "Device",
  "Submitted At",
];

var WISH_SHEET = "Wishes";
var WISH_HEADERS = ["Timestamp", "Name", "Phone", "Wish", "Is Custom", "Status"];

/* ------------------------------- POST ------------------------------ */

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var type = String(payload.type || "rsvp").toLowerCase();

    if (type === "wish") return saveWish(payload);
    return saveRsvp(payload);
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

function saveRsvp(payload) {
  var name = String(payload.name || "").trim();
  var phone = String(payload.phone || "").trim();
  var guestCount = parseInt(payload.guestCount, 10);
  var attendance = String(payload.attendance || "").trim().toLowerCase();
  var device = String(payload.device || "Unknown").trim();
  var submittedAt = String(payload.submittedAt || "").trim();

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

  getSheet(RSVP_SHEET, RSVP_HEADERS).appendRow([
    now(),
    name,
    phone,
    guestCount,
    attendance === "accept" ? "Accept" : "Decline",
    device,
    submittedAt,
  ]);

  return json({ success: true });
}

function saveWish(payload) {
  var name = String(payload.name || "").trim();
  var phone = String(payload.phone || "").trim();
  var wish = String(payload.wish || "").trim();
  var isCustom = payload.isCustom === true || payload.isCustom === "true";

  if (!name) return json({ success: false, error: "Name is required." });
  if (!wish) return json({ success: false, error: "A wish is required." });

  getSheet(WISH_SHEET, WISH_HEADERS).appendRow([
    now(),
    name,
    phone,
    wish,
    isCustom ? "Yes" : "No",
    "Pending",
  ]);

  return json({ success: true });
}

/* ------------------------------- GET ------------------------------- */

function doGet(e) {
  var action = e && e.parameter ? String(e.parameter.action || "") : "";

  if (action === "wishes") {
    // Return a plain array of approved wishes: [{ name, wish }, ...]
    return json(getApprovedWishes());
  }

  return json({ success: true, status: "Wedding endpoint is live." });
}

function getApprovedWishes() {
  var values = getSheet(WISH_SHEET, WISH_HEADERS).getDataRange().getValues();
  var out = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var name = row[1];
    var wish = row[3];
    var status = String(row[5]).trim().toLowerCase();
    if (status === "approved" && name && wish) {
      out.push({ name: String(name), wish: String(wish) });
    }
  }
  return out;
}

/* ----------------------------- helpers ----------------------------- */

function getSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function now() {
  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd HH:mm:ss"
  );
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
