const College = require('../models/College');

exports.createCollege = async (req, res) => {
  try {
    // Typically only a super admin creates a college.
    const college = new College(req.body);
    const savedCollege = await college.save();
    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getColleges = async (req, res) => {
  try {
    if (req.user.role === 'full') {
      const colleges = await College.find();
      return res.json(colleges);
    } else if (req.user.role === 'college') {
      const college = await College.findById(req.user.entityId);
      return res.json(college ? [college] : []);
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    if (req.user.role === 'college' && college._id.toString() !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    if (req.user.role === 'college' && college._id.toString() !== req.user.entityId) {
      return res.status(403).json({ message: "Access denied" });
    }
    const updatedCollege = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCollege);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    // Only super admin can delete a college
    if (req.user.role !== 'full') {
      return res.status(403).json({ message: "Access denied" });
    }
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
