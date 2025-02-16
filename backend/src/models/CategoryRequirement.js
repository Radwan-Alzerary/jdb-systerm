const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryRequirementSchema = new Schema({
  numberOfEmployees: Number,
  requiredCertificateIds: [String],
  requiredGeneralSpecializationIds: [String],
  requiredSubspecialtyIds: [String],
}
);

module.exports = mongoose.model('CategoryRequirement', CategoryRequirementSchema);
