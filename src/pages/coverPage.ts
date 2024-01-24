import { AdvertisementInfoPDF } from "../announcementLoader";
import { renderGenericInfo, renderHeader } from "./pdfComponents";
import { fetchImage } from "../helpers/http";
import { MARGIN_LEFT } from "../consts";

export async function renderCoverPage(doc: PDFKit.PDFDocument, announcement: AdvertisementInfoPDF) 
{
  renderHeader(doc);

  // TODO put logo & QR Code
  const image = await fetchImage(announcement.backgroundImageUrl);

  // Set background
  doc.roundedRect(20, 80, 800, 450, 15).clip().image(image, 20, 80, {
    width: 800,
    height: 450,
  });

  renderGenericInfo(doc, announcement, MARGIN_LEFT, 100, true, 400, 180);
}
