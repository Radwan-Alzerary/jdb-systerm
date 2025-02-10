const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  collegeId: { type: String, required: true },
  adminId: { type: String },   // Optional: department admin assigned to this department
  createdBy: { type: String }  // Admin ID who created this department
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);
