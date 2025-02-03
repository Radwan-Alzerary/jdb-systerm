const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSuggestionSchema = new Schema({
  name: { type: String, required: true },
  certificateId: { type: String, required: true },
  generalSpecializationId: { type: String, required: true },
  subspecialtyId: { type: String, required: true },
  matchPercentage: { type: Number, required: true },
});

module.exports = mongoose.model('EmployeeSuggestion', EmployeeSuggestionSchema);
