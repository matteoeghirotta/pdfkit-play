import { AdvertisementInfoPDF } from "../announcementLoader";
import { BLUE_QUIMMO, MARGIN_LEFT } from "../consts";
import { renderGenericInfo, renderHeader, renderIconValueTable } from "./pdfComponents";

export function renderDetailPage(
  doc: PDFKit.PDFDocument,
  announcement: AdvertisementInfoPDF
) {
  doc.addPage();
  renderHeader(doc);
  renderGenericInfo(doc, announcement, MARGIN_LEFT, 70, false, 400, 180);

  // Equipments
  doc.x = MARGIN_LEFT;
  doc.y += 25;
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .fillColor(BLUE_QUIMMO)
    .text("DOTAZIONI");

  doc.x = MARGIN_LEFT;
  doc.y += 10;

  renderIconValueTable(doc, doc.x, doc.y, announcement.features, 3, 120);

  // Description
  doc.x = MARGIN_LEFT;
  doc.y = 420;
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .fillColor(BLUE_QUIMMO)
    .text("DESCRIZIONE");

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("black")
    .text(`Cod. Annuncio: ${announcement.code} - ${announcement.description}`, {
      width: 400,
      height: 130,
      ellipsis: "...",
    });
}
