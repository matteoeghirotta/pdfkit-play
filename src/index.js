const { cover } = require("./cover");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const doc = new PDFDocument({
  size: "A4",
  font: "Courier",
  layout: "landscape",
});

doc.pipe(fs.createWriteStream("./file.pdf")); // write to PDF

// add stuff to PDF here using methods described below...
doc.addPage(cover);

// finalize the PDF and end the stream
doc.end();
