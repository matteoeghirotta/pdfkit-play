import { Announcement } from "../announcementLoader";
import { renderHeader } from "./pdfComponents";

export function renderDetailPage(
  doc: PDFKit.PDFDocument,
  announcement: Announcement
) {
    doc.addPage();
    renderHeader(doc);
    doc.text("Hello");
}
