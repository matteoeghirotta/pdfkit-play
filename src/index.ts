import * as fs from "fs";
import PDFDocument from "pdfkit";
import { fetchAdvertisement } from "./announcementLoader";
import { renderCoverPage } from "./pages/coverPage";
import { renderDetailPage } from "./pages/detailPage";

async function generate() {
  const doc = new PDFDocument({
    size: "A4",
    font: "Courier",
    layout: "landscape"
  });

  const announcement = await fetchAdvertisement();

  // Render pages
  await renderCoverPage(doc, announcement);
  await renderDetailPage(doc, announcement);

  doc.pipe(fs.createWriteStream("./file.pdf")); // write to PDF

  // finalize the PDF and end the stream
  doc.end();
}



generate();
