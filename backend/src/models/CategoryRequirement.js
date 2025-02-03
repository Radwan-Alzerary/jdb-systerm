const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryRequirementSchema = new Schema({
  numberOfEmployees: { type: Number, required: true },
  requiredCertificateIds: [{ type: String }],
  requiredGeneralSpecializationIds: [{ type: String }],
  requiredSubspecialtyIds: [{ type: String }],
});

module.exports = mongoose.model('CategoryRequirement', CategoryRequirementSchema);
