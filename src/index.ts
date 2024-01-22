import * as fs from "fs";
import PDFDocument, { opacity } from "pdfkit";
import * as announcement from "./source.json";
import axios from "axios";

const title = announcement.title;
const blueQuimmo = "#006FDF";
const price = announcement.content.lot.amounts.displayedPrice;
const grey = "#7a7b7d";
const area = announcement.content.lot.features[0].text;
const roomText =
  announcement.content.lot.features[1].formattedValue + " locali";
const city = announcement.content.lot.location.city;
const province = announcement.content.lot.location.province;
const address =
  "Via delle dolomiti 126";

async function generate() {
  const doc = new PDFDocument({
    size: "A4",
    font: "Courier",
    layout: "landscape",
  });

  const image = await fetchImage(announcement.content.lot.images[0].urls.large);

  // ===== HEADER

  // Drawing horizontal line
  doc.moveTo(20, 20).lineTo(820, 20).lineWidth(2).fillAndStroke(blueQuimmo);

  // TODO: put logo & QR Code

  // Set background
  doc.roundedRect(20, 80, 800, 450, 15).clip().image(image, 20, 80, {
    width: 800,
    height: 450,
  });

  renderGenericInfo(doc, 30, 100, true, 400, 200);

  doc.pipe(fs.createWriteStream("./file.pdf")); // write to PDF

  // add stuff to PDF here using methods described below...
  doc.addPage({ layout: "landscape" });

  // finalize the PDF and end the stream
  doc.end();
}

async function fetchImage(src: string) {
  const image = await axios.get(src, {
    responseType: "arraybuffer",
  });
  return image.data;
}

function renderGenericInfo(
  doc: PDFKit.PDFDocument,
  originX: number,
  originY: number,
  renderBackground: boolean,
  width: number,
  height: number
) {
  if (renderBackground) {
    doc
      .roundedRect(originX, originY, width, height, 15)
      .fillOpacity(0.8)
      .fillAndStroke("#ebedf0")
      .restore();
  }

  var textStartingX = originX + 20;

  doc.x = textStartingX;
  doc.y = originY + 20;

  // Title
  doc
    .fillColor("black")
    .font("Helvetica-Bold")
    .fontSize(20)
    .text(title, {
      width: 380,
    })
    .restore();

  doc.fontSize(12).text("\n");

  // Price
  doc
    .fillColor(blueQuimmo)
    .fontSize(26)
    .text(`${price.toLocaleString("it-IT")} €`)
    .restore();

  doc.fontSize(12).text("\n");

  var textXOffset = 20;
  var textYOffset = 2;
  var x = doc.x;
  var y = doc.y;

  // ===== Detail Row =====
  var columnWidth = 80;
  doc.fillColor(grey).fontSize(14);

  // first column
  doc.image("dist/smile.png", {
    width: 15,
    height: 15,
  });
  doc.text(area, x + textXOffset, y + textYOffset);

  // second column
  x += columnWidth;
  doc.image("dist/smile.png", x, y, {
    width: 15,
    height: 15,
  });
  doc.text(roomText, x + textXOffset, y + textYOffset);

  // third column
  x += columnWidth;
  doc.image("dist/smile.png", x, y, {
    width: 15,
    height: 15,
  });
  doc.text("2 bagni", x + textXOffset, y + textYOffset);

  doc.text("\n");

  // ===== Detail Row =====
  doc.x = textStartingX; // reset doc x
  x = textStartingX;
  y = doc.y;

  doc.image("dist/smile.png", {
    width: 15,
    height: 15,
  });

  doc.text(`${city} (${province})`, x+textXOffset, y+textYOffset, {lineBreak: false});

  if (address)
  {
    doc.text(` - ${address}`, { width: width - 130 });
  }
}

generate();
