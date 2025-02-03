const GeneralSpecialization = require('../models/GeneralSpecialization');

exports.createGeneralSpecialization = async (req, res) => {
  try {
    const generalSpecialization = new GeneralSpecialization(req.body);
    const savedGeneralSpecialization = await generalSpecialization.save();
    res.status(201).json(savedGeneralSpecialization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGeneralSpecializations = async (req, res) => {
  try {
    const generalSpecializations = await GeneralSpecialization.find();
    res.json(generalSpecializations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGeneralSpecializationById = async (req, res) => {
  try {
    const generalSpecialization = await GeneralSpecialization.findById(req.params.id);
    if (!generalSpecialization) return res.status(404).json({ message: 'General Specialization not found' });
    res.json(generalSpecialization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGeneralSpecialization = async (req, res) => {
  try {
    const updatedGeneralSpecialization = await GeneralSpecialization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGeneralSpecialization) return res.status(404).json({ message: 'General Specialization not found' });
    res.json(updatedGeneralSpecialization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGeneralSpecialization = async (req, res) => {
  try {
    const deletedGeneralSpecialization = await GeneralSpecialization.findByIdAndDelete(req.params.id);
    if (!deletedGeneralSpecialization) return res.status(404).json({ message: 'General Specialization not found' });
    res.json({ message: 'General Specialization deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
