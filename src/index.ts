import PDFDocument from "pdfkit";
import * as fs from "fs";

const doc = new PDFDocument({
  size: "A4",
  font: "Courier",
  layout: "landscape",
});

doc.pipe(fs.createWriteStream("./file.pdf")); // write to PDF

// add stuff to PDF here using methods described below...
doc.addPage({ layout: "landscape" });

// finalize the PDF and end the stream
doc.end();
