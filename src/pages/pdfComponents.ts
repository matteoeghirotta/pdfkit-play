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

  const textStartingX = originX + 20;
  const iconDim = 15;
  doc.x = textStartingX;
  doc.y = originY + 20;

  if (renderBackground) {
    doc
      .roundedRect(originX, originY, width, height, 15)
      .fillOpacity(0.8)
      .fillAndStroke("#ebedf0")
      .restore();
  }

  // Title
  doc
    .fillColor("black")
    .font("Helvetica-Bold")
    .fontSize(20)
    .text(announcement.title, {
      width: 380,
    })
    .restore();

  doc.fontSize(12).text("\n");

  // Price
  doc
    .fillColor(BLUE_QUIMMO)
    .fontSize(26)
    .text(`${announcement.price.toLocaleString("it-IT")} €`)
    .restore();

  doc.fontSize(12).text("\n");

  var textXOffset = 20;
  var textYOffset = 2;
  var x = doc.x;
  var y = doc.y;

  // ===== Detail Row =====
  var columnWidth = 80;
  doc.fillColor(GREY).fontSize(14);

  // first column
  doc.image(`${__dirname}/../resources/smile.png`, {
    width: iconDim,
    height: iconDim,
  });
  doc.text(announcement.squareFootageText, x + textXOffset, y + textYOffset);

  // second column
  x += columnWidth;
  doc.image(`${__dirname}/../resources/smile.png`, x, y, {
    width: iconDim,
    height: iconDim,
  });
  doc.text(announcement.roomsNumberText, x + textXOffset, y + textYOffset);

  // third column
  x += columnWidth;
  doc.image(`${__dirname}/../resources/smile.png`, x, y, {
    width: iconDim,
    height: iconDim,
  });
  doc.text("2 bagni", x + textXOffset, y + textYOffset);

  doc.text("\n");

  // ===== Detail Row =====
  doc.x = textStartingX; // reset doc x
  x = textStartingX;
  y = doc.y;

  doc.image(`${__dirname}/../resources/smile.png`, {
    width: iconDim,
    height: iconDim,
  });

  doc.text(`${announcement.city} (${announcement.province})`, x + textXOffset, y + textYOffset, {
    lineBreak: false,
  });

  if (announcement.address) {
    doc.text(` - ${announcement.address}`, { width: width - 130 });
  }
}