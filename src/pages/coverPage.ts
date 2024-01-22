import { Announcement } from "../announcementLoader";
import { renderGenericInfo, renderHeader } from "./pdfComponents";
import { fetchImage } from "../http";

export async function renderCoverPage(doc: PDFKit.PDFDocument, announcement: Announcement) 
{
  renderHeader(doc);

  // TODO put logo & QR Code
  const image = await fetchImage(announcement.backgroundImageUrl);

  // Set background
  doc.roundedRect(20, 80, 800, 450, 15).clip().image(image, 20, 80, {
    width: 800,
    height: 450,
  });

    renderGenericInfo(doc, announcement, 30, 100, true, 400, 200);
}
