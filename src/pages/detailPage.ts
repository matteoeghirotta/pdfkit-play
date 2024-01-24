import { AdvertisementInfoPDF } from "../announcementLoader";
import {
  BLUE_QUIMMO,
  IMAGE_ROUNDING,
  MARGIN_LEFT,
  MARGIN_TOP,
} from "../consts";
import { fetchImage } from "../helpers/http";
import {
  renderGenericInfo,
  renderHeader,
  renderIconValueTable,
} from "./pdfComponents";

export async function renderDetailPage(
  doc: PDFKit.PDFDocument,
  announcement: AdvertisementInfoPDF
) {
  doc.addPage();
  renderHeader(doc);
  renderGenericInfo(
    doc,
    announcement,
    MARGIN_LEFT,
    MARGIN_TOP,
    false,
    400,
    180
  );

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
      width: 370,
      height: 130,
      ellipsis: "...",
    });

  // Images
  var url: string | undefined = "";
  var image = "";
  var imageX;
  var imageY;
  var imageWidth;
  var imageHeight;

  // first
  url = announcement.detailImageUrls.at(0);
  if (url) {
    image = await fetchImage(url);
    imageX = 440;
    imageY = 75;
    imageWidth = 380;
    imageHeight = 220;

    doc
      .roundedRect(imageX, imageY, imageWidth, imageHeight, IMAGE_ROUNDING)
      .save()
      .clip()
      .image(image, imageX, imageY, { width: imageWidth, height: imageHeight })
      .restore();
  }

  // second
  url = announcement.detailImageUrls.at(1);
  if (url) {
    image = await fetchImage(url);
    imageX = 440;
    imageY = 310;
    imageWidth = 185;
    imageHeight = 110;

    doc
      .roundedRect(imageX, imageY, imageWidth, imageHeight, IMAGE_ROUNDING)
      .save()
      .clip()
      .image(image, imageX, imageY, {
        width: imageWidth,
        height: imageHeight,
      })
      .restore();
  }

  // third
  url = announcement.detailImageUrls.at(2);
  if (url) {
    image = await fetchImage(url);
    imageX = 635;
    imageY = 310;
    imageWidth = 185;
    imageHeight = 110;

    doc
      .roundedRect(imageX, imageY, imageWidth, imageHeight, IMAGE_ROUNDING)
      .save()
      .clip()
      .image(image, imageX, imageY, {
        width: imageWidth,
        height: imageHeight,
      })
      .restore();
  }

  // fourth
  url = announcement.detailImageUrls.at(3);
  if (url) 
  {
    image = await fetchImage(url);
    imageX = 440;
    imageY = 435;
    imageWidth = 185;
    imageHeight = 110;

    doc
      .roundedRect(imageX, imageY, imageWidth, imageHeight, IMAGE_ROUNDING)
      .save()
      .clip()
      .image(image, imageX, imageY, {
        width: imageWidth,
        height: imageHeight,
      })
      .restore();
  }

  // fifth
  url = announcement.detailImageUrls.at(4);
  if (url) {
    image = await fetchImage(url);
    imageX = 635;
    imageY = 435;
    imageWidth = 185;
    imageHeight = 110;

    doc
      .roundedRect(imageX, imageY, imageWidth, imageHeight, IMAGE_ROUNDING)
      .save()
      .clip()
      .image(image, imageX, imageY, {
        width: imageWidth,
        height: imageHeight,
      })
      .restore();
  }

  // // Images
  // for(let i = 0; i < announcement.detailImageUrls.length; i++)
  // {
  //   var image = await fetchImage(announcement.detailImageUrls[i]);

  //   doc
  //     .roundedRect(420, MARGIN_TOP-10, 400, 220, 15)
  //     .clip()
  //     .image(image, 420, MARGIN_TOP-10, {
  //       width: 400,
  //       height: 220,
  //     });

  //   break;
  // }
}
