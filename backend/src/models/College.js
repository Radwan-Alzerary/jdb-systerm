const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
  name: { type: String, required: true },
  adminId: { type: String },
});

module.exports = mongoose.model('College', CollegeSchema);
