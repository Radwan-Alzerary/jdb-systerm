const DepartmentRequirement = require('../models/DepartmentRequirement');

exports.createDepartmentRequirement = async (req, res) => {
  try {
    const departmentRequirement = new DepartmentRequirement(req.body);
    const savedDepartmentRequirement = await departmentRequirement.save();
    res.status(201).json(savedDepartmentRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentRequirements = async (req, res) => {
  try {
    const departmentRequirements = await DepartmentRequirement.find();
    res.json(departmentRequirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentRequirementById = async (req, res) => {
  try {
    const departmentRequirement = await DepartmentRequirement.findById(req.params.id);
    if (!departmentRequirement) return res.status(404).json({ message: 'Department Requirement not found' });
    res.json(departmentRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartmentRequirement = async (req, res) => {
  try {
    const updatedDepartmentRequirement = await DepartmentRequirement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDepartmentRequirement) return res.status(404).json({ message: 'Department Requirement not found' });
    res.json(updatedDepartmentRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartmentRequirement = async (req, res) => {
  try {
    const deletedDepartmentRequirement = await DepartmentRequirement.findByIdAndDelete(req.params.id);
    if (!deletedDepartmentRequirement) return res.status(404).json({ message: 'Department Requirement not found' });
    res.json({ message: 'Department Requirement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
