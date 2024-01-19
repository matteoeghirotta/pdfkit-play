import * as fs from "fs";
import PDFDocument, { opacity } from "pdfkit";
import * as announcement from "./source.json";
import axios from "axios";

async function generate() {
  const doc = new PDFDocument({
    size: "A4",
    font: "Courier",
    layout: "landscape",
  });

  const image = await fetchImage(
    announcement.content.M.lot.M.images.L[0]?.M.urls.M.large.S
  );

  const title = announcement.title.S;

  // ===== HEADER

  // Drawing horizontal line
  doc.moveTo(20, 20).lineTo(820, 20).lineWidth(2).fillAndStroke("#006FDF");

  // TODO: put logo & QR Code

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.roundedRect(20, 80, 800, 450, 15).clip().image(image, 20, 80, {
    width: 800,
    height: 450,
  });

  doc
    .roundedRect(30, 100, 400, 150, 15)
    .fillOpacity(0.8)
    .fillAndStroke("#ebedf0")
    .restore();

  doc
    .fillColor("black")
    .font("Helvetica-Bold")
    .fontSize(20)
    .text(title, 45, 115, {
      width: 380,
    });

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

generate();
