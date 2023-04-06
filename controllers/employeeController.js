const Employee = require("./../model/Employee");

const get_all_employyes = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status("204").json({ message: "No employee found" });
  res.json(employees);
};

const create_new_employee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    res.status(400).json({ message: "First and last name required" });
  }
  try {
    const result = Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const update_employee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const delete_employee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required." });

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  }
  const result = await employee.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const get_employee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID required." });

  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  res.json(employee);
};

module.exports = {
  get_all_employyes,
  create_new_employee,
  update_employee,
  update_employee,
  get_employee,
  delete_employee,
};
