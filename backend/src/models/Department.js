const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  collegeId: { type: String, required: true },
  adminId: { type: String },
});

module.exports = mongoose.model('Department', DepartmentSchema);
