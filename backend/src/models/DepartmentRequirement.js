const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryRequirementSchema = new Schema({
  numberOfEmployees: { type: Number, required: true },
  requiredCertificateIds: [{ type: String }],
  requiredGeneralSpecializationIds: [{ type: String }],
  requiredSubspecialtyIds: [{ type: String }],
});

const DepartmentRequirementSchema = new Schema({
  departmentId: { type: String, required: true },
  administrative: [CategoryRequirementSchema],
  teaching: [CategoryRequirementSchema],
  technician: [CategoryRequirementSchema],
});

module.exports = mongoose.model('DepartmentRequirement', DepartmentRequirementSchema);
