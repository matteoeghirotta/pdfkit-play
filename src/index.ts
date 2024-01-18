import * as fs from "fs";
import PDFDocument from "pdfkit";
import * as announcement from "./source.json";
import axios from "axios";

async function generate() {
  const doc = new PDFDocument({
    size: "A4",
    font: "Courier",
    layout: "landscape",
  });

  const logo = await fetchImage(
    announcement.content.M.lot.M.images.L[0]?.M.urls.M.large.S
  );

  doc.image(logo, 100, 200, {scale: 0.25});

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