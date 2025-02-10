const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
  name: { type: String, required: true },
  adminId: { type: String },  // Special college admin assigned
  createdBy: { type: String } // Admin ID who created this college (usually by super admin)
}, { timestamps: true });

module.exports = mongoose.model('College', CollegeSchema);
