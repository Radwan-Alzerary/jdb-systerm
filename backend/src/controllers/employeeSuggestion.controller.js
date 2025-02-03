const EmployeeSuggestion = require('../models/EmployeeSuggestion');

exports.createEmployeeSuggestion = async (req, res) => {
  try {
    const suggestion = new EmployeeSuggestion(req.body);
    const savedSuggestion = await suggestion.save();
    res.status(201).json(savedSuggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeSuggestions = async (req, res) => {
  try {
    const suggestions = await EmployeeSuggestion.find();
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeSuggestionById = async (req, res) => {
  try {
    const suggestion = await EmployeeSuggestion.findById(req.params.id);
    if (!suggestion) return res.status(404).json({ message: 'Employee Suggestion not found' });
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployeeSuggestion = async (req, res) => {
  try {
    const updatedSuggestion = await EmployeeSuggestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSuggestion) return res.status(404).json({ message: 'Employee Suggestion not found' });
    res.json(updatedSuggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployeeSuggestion = async (req, res) => {
  try {
    const deletedSuggestion = await EmployeeSuggestion.findByIdAndDelete(req.params.id);
    if (!deletedSuggestion) return res.status(404).json({ message: 'Employee Suggestion not found' });
    res.json({ message: 'Employee Suggestion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
