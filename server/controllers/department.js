const Department = require("../models/department");

exports.getDepartments = async (req, res, next) => {
  const departments = await Department.findAll({ order: ["createdAt"] });
  return res.status(200).json(departments);
};

exports.createDepartment = async (req, res, next) => {
  const result = await Department.create(req.body);
  if (result._options.isNewRecord) {
    return res.status(201).json({ message: "New department created" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.deleteDepartment = async (req, res, next) => {
  const Id = req.params.id;
  const result = await Department.destroy({ where: { Id } });
  if (result === 1) {
    return res.status(201).json({ message: "Deleted" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.updateDepartment = async (req, res, next) => {
  const Id = req.params.id;
  const result = await Department.update(
    { Name: req.body.Name },
    { where: { Id } }
  );
  if (result[0] === 1) {
    return res.status(201).json({ message: "Updated" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};
