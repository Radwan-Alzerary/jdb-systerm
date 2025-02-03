const JobGrade = require('../models/JobGrade');

exports.createJobGrade = async (req, res) => {
  try {
    const jobGrade = new JobGrade(req.body);
    const savedJobGrade = await jobGrade.save();
    res.status(201).json(savedJobGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobGrades = async (req, res) => {
  try {
    const jobGrades = await JobGrade.find();
    res.json(jobGrades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobGradeById = async (req, res) => {
  try {
    const jobGrade = await JobGrade.findById(req.params.id);
    if (!jobGrade) return res.status(404).json({ message: 'Job Grade not found' });
    res.json(jobGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJobGrade = async (req, res) => {
  try {
    const updatedJobGrade = await JobGrade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJobGrade) return res.status(404).json({ message: 'Job Grade not found' });
    res.json(updatedJobGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteJobGrade = async (req, res) => {
  try {
    const deletedJobGrade = await JobGrade.findByIdAndDelete(req.params.id);
    if (!deletedJobGrade) return res.status(404).json({ message: 'Job Grade not found' });
    res.json({ message: 'Job Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
