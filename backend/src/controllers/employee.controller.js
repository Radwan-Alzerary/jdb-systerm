const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    // Attach createdBy info from req.user
    const employeeData = { ...req.body, createdBy: req.user.id };
    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'department') {
      filter.departmentId = req.user.entityId;
    } else if (req.user.role === 'college') {
      filter.collegeId = req.user.entityId;
    }
    const employees = await Employee.find(filter);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    // Check access permission based on role
    if (req.user.role === 'department' && employee.departmentId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role === 'college' && employee.collegeId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    if (req.user.role === 'department' && employee.departmentId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role === 'college' && employee.collegeId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    if (req.user.role === 'department' && employee.departmentId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role === 'college' && employee.collegeId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
