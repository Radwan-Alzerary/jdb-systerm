const Workplace = require('../models/Workplace');

exports.createWorkplace = async (req, res) => {
  try {
    const workplace = new Workplace(req.body);
    const savedWorkplace = await workplace.save();
    res.status(201).json(savedWorkplace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWorkplaces = async (req, res) => {
  try {
    const workplaces = await Workplace.find();
    res.json(workplaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWorkplaceById = async (req, res) => {
  try {
    const workplace = await Workplace.findById(req.params.id);
    if (!workplace) return res.status(404).json({ message: 'Workplace not found' });
    res.json(workplace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWorkplace = async (req, res) => {
  try {
    const updatedWorkplace = await Workplace.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkplace) return res.status(404).json({ message: 'Workplace not found' });
    res.json(updatedWorkplace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWorkplace = async (req, res) => {
  try {
    const deletedWorkplace = await Workplace.findByIdAndDelete(req.params.id);
    if (!deletedWorkplace) return res.status(404).json({ message: 'Workplace not found' });
    res.json({ message: 'Workplace deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
