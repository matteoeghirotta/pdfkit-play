import { AdvertisementInfoPDF } from "../announcementLoader";
import { renderGenericInfo, renderHeader } from "./pdfComponents";
import { fetchImage } from "../helpers/http";
import { IMAGE_ROUNDING, MARGIN_LEFT, MARGIN_TOP } from "../consts";

export async function renderCoverPage(doc: PDFKit.PDFDocument, announcement: AdvertisementInfoPDF) 
{
  renderHeader(doc);

  // TODO put logo & QR Code
  
  const image = await fetchImage(announcement.backgroundImageUrl);

  // Set background
  doc.roundedRect(MARGIN_LEFT, MARGIN_TOP, 800, 450, IMAGE_ROUNDING).clip().image(image, MARGIN_LEFT, MARGIN_TOP, {
    width: 800,
    height: 450,
  });

  renderGenericInfo(doc, announcement, MARGIN_LEFT+20, 100, true, 400, 180);
}
