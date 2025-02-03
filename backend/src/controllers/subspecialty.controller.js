const Subspecialty = require('../models/Subspecialty');

exports.createSubspecialty = async (req, res) => {
  try {
    const subspecialty = new Subspecialty(req.body);
    const savedSubspecialty = await subspecialty.save();
    res.status(201).json(savedSubspecialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubspecialties = async (req, res) => {
  try {
    const subspecialties = await Subspecialty.find();
    res.json(subspecialties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubspecialtyById = async (req, res) => {
  try {
    const subspecialty = await Subspecialty.findById(req.params.id);
    if (!subspecialty) return res.status(404).json({ message: 'Subspecialty not found' });
    res.json(subspecialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubspecialty = async (req, res) => {
  try {
    const updatedSubspecialty = await Subspecialty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubspecialty) return res.status(404).json({ message: 'Subspecialty not found' });
    res.json(updatedSubspecialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubspecialty = async (req, res) => {
  try {
    const deletedSubspecialty = await Subspecialty.findByIdAndDelete(req.params.id);
    if (!deletedSubspecialty) return res.status(404).json({ message: 'Subspecialty not found' });
    res.json({ message: 'Subspecialty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
