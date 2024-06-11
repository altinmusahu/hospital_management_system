const Medicament = require("../models/medicament");
const XLSX = require("xlsx");
const { v4 } = require("uuid");

exports.getAllMedicaments = async (req, res, next) => {
  const medicaments = await Medicament.findAll();
  return res.status(200).json(medicaments);
};

exports.createMedicament = async (req, res, next) => {
  const { Emri, Prodhuesi, Masa, paRecete } = req.body;
  //The model must change: wrong column's name
  const result = await Medicament.create({
    Emri,
    Prodhuesi,
    "Masa(mg)": Masa,
    JepetPaRecete: paRecete,
  });
  if (result._options.isNewRecord) {
    return res.status(201).json({ message: "New medicament created" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.getOneMedicament = async (req, res, next) => {
  const { id } = req.params;
  const medicament = await Medicament.findByPk(id);
  if (medicament) {
    return res.status(200).json(medicament);
  }
  return res.status(404).json({ message: "No medicament found" });
};

exports.updateMedicament = async (req, res, next) => {
  const { id } = req.params;
  const { Emri, Prodhuesi, Masa, paRecete } = req.body;
  const result = await Medicament.update(
    {
      Emri,
      Prodhuesi,
      "Masa(mg)": Masa,
      JepetPaRecete: paRecete,
    },
    { where: { Id: id } }
  );
  if (result[0] === 1) {
    return res.status(200).json({ message: "Updated successfully" });
  }
  return res.status(404).json({ message: "No medicaments found with this id" });
};

exports.deleteMedicament = async (req, res, next) => {
  const { id } = req.params;
  const result = await Medicament.destroy({ where: { Id: id } });
  if (result === 1) {
    return res.status(200).json({ message: "Deleted successfully" });
  }
  return res.status(404).json({ message: "No medicaments found with this id" });
};

exports.importMedicaments = async (req, res, next) => {
  const wb = XLSX.readFile(req.file.path);
  const sheets = wb.SheetNames;
  let modifiedData = [];
  if (sheets.length > 0) {
    const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
    data.map((med) => modifiedData.push({ ...med, Id: v4() }));
    const medicaments = await Medicament.bulkCreate(modifiedData, {
      fields: ["Id", "Emri", "Prodhuesi", "Masa(mg)", "JepetPaRecete"],
    });
  }
  return res.status(201).json({ message: "Uploaded" });
};
