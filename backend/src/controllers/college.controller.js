const College = require('../models/College');

exports.createCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    const savedCollege = await college.save();
    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCollege = async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCollege) return res.status(404).json({ message: 'College not found' });
    res.json(updatedCollege);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    const deletedCollege = await College.findByIdAndDelete(req.params.id);
    if (!deletedCollege) return res.status(404).json({ message: 'College not found' });
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
