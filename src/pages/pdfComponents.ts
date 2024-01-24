import { AdvertisementInfoPDF } from "../announcementLoader";
import { BLUE_QUIMMO, GREY, MARGIN_LEFT } from "../consts";

export function renderHeader(doc: PDFKit.PDFDocument) {
  doc.moveTo(20, 20).lineTo(820, 20).lineWidth(2).fillAndStroke(BLUE_QUIMMO);
}

export function renderGenericInfo(
  doc: PDFKit.PDFDocument,
  announcement: AdvertisementInfoPDF,
  originX: number,
  originY: number,
  renderBackground: boolean,
  width: number,
  height: number
) {

  let textStartingX = originX;
  const iconDim = 15;

  if (renderBackground) {
    doc
      .roundedRect(originX, originY, width, height, 15)
      .fillOpacity(0.8)
      .fillAndStroke("#ebedf0")
      .restore();
  
      textStartingX += 10;
      doc.y = originY + 20;
  }

    doc.x = textStartingX;

  // Title
  doc
    .fillColor("black")
    .font("Helvetica-Bold")
    .fontSize(20)
    .text(announcement.title, {
      width: 380,
    })
    .restore();

  // Price
  doc.y += 10;
  doc
    .fillColor(BLUE_QUIMMO)
    .fontSize(26)
    .text(`${announcement.price.toLocaleString("it-IT")} €`)
    .restore();

  doc.y += 8;

  var textXOffset = 20;
  var textYOffset = 2;
  var rowX = doc.x;
  var rowY = doc.y;
  var columnWidth = 80;

  doc.fillColor(GREY).fontSize(12).font("Helvetica");
  // Area
  doc.image(`${__dirname}/../resources/smile.png`, {
    width: iconDim,
    height: iconDim,
  });
  doc.text(announcement.squareFootageText, rowX + textXOffset, rowY + textYOffset);

  // Rooms
  rowX += columnWidth;
  doc.image(`${__dirname}/../resources/smile.png`, rowX, rowY, {
    width: iconDim,
    height: iconDim,
  });
  doc.text(announcement.roomsNumberText, rowX + textXOffset, rowY + textYOffset);

  // Bathrooms
  rowX += columnWidth;
  doc.image(`${__dirname}/../resources/smile.png`, rowX, rowY, {
    width: iconDim,
    height: iconDim,
  });
  doc.text(announcement.bathroomsNumberText, rowX + textXOffset, rowY + textYOffset);

  // Location
  doc.y += 8;
  doc.x = textStartingX; // reset doc x
  rowX = textStartingX;
  rowY = doc.y;

  doc.image(`${__dirname}/../resources/smile.png`, {
    width: iconDim,
    height: iconDim,
  });

  doc.text(`${announcement.city} (${announcement.province})`, rowX + textXOffset, rowY + textYOffset, {
    lineBreak: false,
  });

  if (announcement.address) {
    doc.text(` - ${announcement.address}`, { width: width - 130 });
  }
}

export function renderIconValueTable(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  features: Array<[string, string]>,
  numberOfColumns: number,
  columnWidth: number
) {
  doc.restore();

  if (features.length == 0) {
    return;
  }

  const textOffsetX = 20;
  const textOffsetY = 2;
  doc.x = x;
  doc.y = y;
  let currentColumn = 0;
  let currentX = x;
  let currentY = y;
  doc.fillColor(GREY).fontSize(10).font("Helvetica");

  for (var item of features) {
    currentX = x + (currentColumn * columnWidth);

    doc.image(`${__dirname}/../resources/${item[1]}`, currentX, currentY, {
      width: 15,
      height: 15,
    });

    doc.text(item[0], currentX + textOffsetX, currentY + textOffsetY, {width: columnWidth-10});

    currentColumn++;

    if(currentColumn == numberOfColumns) // got to a new row
    {
      currentColumn = 0;
      currentY += 25;
    }
  }
}