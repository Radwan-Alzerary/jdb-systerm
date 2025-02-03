const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Full-time", "Part-time", "Contract"], required: true },
  certificateId: { type: String, required: true },
  generalSpecializationId: { type: String, required: true },
  subspecialtyId: { type: String, required: true },
  positionId: { type: String, required: true },
  workplaceId: { type: String, required: true },
  collegeId: { type: String, required: true },
  departmentId: { type: String, required: true },
  startDate: { type: String, required: true },
  specialCategory: { type: String, enum: ["politicalPrisoner", "martyrFamily"] },
  jobGradeId: { type: String, required: true },
  isAssigned: { type: Boolean, required: true, default: false },
  assignmentEntity: { type: String },
  assignedFrom: { type: String },
  assignedTo: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
