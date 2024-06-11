const path = require("path");
const { fillColor } = require("pdfkit");

const report = (doc, data, invoiceId) => {
  doc
    .image(path.join(__dirname, "s1.png"), 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(24)
    .text("ORTHOC", 110, 57, { underline: true })
    .fontSize(10)
    .text("ORTHOC LTD", 200, 50, { align: "right" })
    .text("Boul. Bill Clinton", 200, 65, { align: "right" })
    .text("Prishtinë, 10000, RKS", 200, 80, { align: "right" })
    .moveDown();

  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Results", 50, 160, { align: "center" });
  generateHr(doc, 185);
  const customerInformationTop = 200;
  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoiceId.toString(), 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .font("Helvetica-Bold")
    .text(
      data.Patient.Emri + " " + data.Patient.Mbiemri,
      300,
      customerInformationTop
    )
    .font("Helvetica")
    .text("Departmenti: " + data.Department, 300, customerInformationTop + 15)
    .text(
      "Doktori: " + data.Doctor.Emri + " " + data.Doctor.Mbiemri,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);

  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Emri",
    "Masa(mg)",
    "Pershkrimi",
    "Doza/Dite",
    "Kohezgjatja"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  data.Results.forEach((item, index) => {
    const position = invoiceTableTop + (index + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.dataValues.Medicament.dataValues.Emri,
      item.dataValues.Medicament.dataValues["Masa(mg)"],
      item.dataValues.Pershkrimi,
      item.dataValues.DozaPerDite,
      item.dataValues.Kohezgjatja
    );
    index--;
    generateHr(doc, position + 20);
  });
};

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const exactDate = day + "/" + month + "/" + year;
  const exactTime = date.getHours() + ":" + date.getMinutes();
  return exactDate + ", " + exactTime;
}

module.exports = report;
