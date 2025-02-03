const CategoryRequirement = require('../models/CategoryRequirement');

exports.createCategoryRequirement = async (req, res) => {
  try {
    const categoryRequirement = new CategoryRequirement(req.body);
    const savedCategoryRequirement = await categoryRequirement.save();
    res.status(201).json(savedCategoryRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryRequirements = async (req, res) => {
  try {
    const categoryRequirements = await CategoryRequirement.find();
    res.json(categoryRequirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryRequirementById = async (req, res) => {
  try {
    const categoryRequirement = await CategoryRequirement.findById(req.params.id);
    if (!categoryRequirement) return res.status(404).json({ message: 'Category Requirement not found' });
    res.json(categoryRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategoryRequirement = async (req, res) => {
  try {
    const updatedCategoryRequirement = await CategoryRequirement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategoryRequirement) return res.status(404).json({ message: 'Category Requirement not found' });
    res.json(updatedCategoryRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategoryRequirement = async (req, res) => {
  try {
    const deletedCategoryRequirement = await CategoryRequirement.findByIdAndDelete(req.params.id);
    if (!deletedCategoryRequirement) return res.status(404).json({ message: 'Category Requirement not found' });
    res.json({ message: 'Category Requirement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
