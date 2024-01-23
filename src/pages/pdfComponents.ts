import { Announcement } from "../announcementLoader";
import { BLUE_QUIMMO, GREY } from "../consts";

export function renderHeader(doc: PDFKit.PDFDocument) {
  doc.moveTo(20, 20).lineTo(820, 20).lineWidth(2).fillAndStroke(BLUE_QUIMMO);
}

export function renderGenericInfo(
  doc: PDFKit.PDFDocument,
  announcement: Announcement,
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
  }

    doc.x = textStartingX;

  // Title
  doc.y = originY + 20;
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

  doc.y += 10;
  var textXOffset = 20;
  var textYOffset = 2;
  var rowX = doc.x;
  var rowY = doc.y;
  var columnWidth = 80;

  // ===== Detail Row =====
  doc.fillColor(GREY).fontSize(14);
  // first column
  doc.image(`${__dirname}/../resources/smile.png`, {
    width: iconDim,
    height: iconDim,
  });
  doc.text(announcement.squareFootageText, rowX + textXOffset, rowY + textYOffset);

  // second column
  rowX += columnWidth;
  doc.image(`${__dirname}/../resources/smile.png`, rowX, rowY, {
    width: iconDim,
    height: iconDim,
  });
  doc.text(announcement.roomsNumberText, rowX + textXOffset, rowY + textYOffset);

  // third column
  rowX += columnWidth;
  doc.image(`${__dirname}/../resources/smile.png`, rowX, rowY, {
    width: iconDim,
    height: iconDim,
  });
  doc.text("2 bagni", rowX + textXOffset, rowY + textYOffset);

  // ===== Address Row =====
  doc.y += 10;
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