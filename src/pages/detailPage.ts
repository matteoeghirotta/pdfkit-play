import { Announcement } from "../announcementLoader";
import { BLUE_QUIMMO, MARGIN_LEFT } from "../consts";
import { renderGenericInfo, renderHeader } from "./pdfComponents";

export function renderDetailPage(
  doc: PDFKit.PDFDocument,
  announcement: Announcement
) {
    doc.addPage();
    renderHeader(doc);
    renderGenericInfo(doc, announcement, MARGIN_LEFT, 70, false, 400, 180);

    

    // Description
    doc.x = MARGIN_LEFT;
    doc.y = 400;
    doc.fontSize(12).fillColor(BLUE_QUIMMO).text("DESCRIZIONE");

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("black")
      .text(announcement.description, {
        width: 400,
        height: 130,
        ellipsis: "...",
      });
}
