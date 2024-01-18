import * as fs from "fs";
import PDFDocument, { circle, options } from "pdfkit";
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

  // ===== HEADER

  // Drawing horizontal line
  doc.moveTo(20, 20).lineTo(820, 20).lineWidth(2).fillAndStroke("#006FDF");

  // TODO: put logo & QR Code

  // Drawing background image
  doc.image(image, 20, 80, {width: 800, height: 450});

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