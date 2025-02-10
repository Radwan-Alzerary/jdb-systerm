const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
  try {
    const departmentData = { ...req.body, createdBy: req.user.id };
    const department = new Department(departmentData);
    const savedDepartment = await department.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'college') {
      filter.collegeId = req.user.entityId;
    } else if (req.user.role === 'department') {
      filter._id = req.user.entityId;
    }
    const departments = await Department.find(filter);
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    if (req.user.role === 'college' && department.collegeId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role === 'department' && department._id.toString() !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    if (req.user.role === 'college' && department.collegeId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role === 'department' && department._id.toString() !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    if (req.user.role === 'college' && department.collegeId !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role === 'department' && department._id.toString() !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
