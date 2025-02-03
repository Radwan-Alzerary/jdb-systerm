const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["full", "college", "department"], required: true },
  entityId: { type: String },
});

module.exports = mongoose.model('Admin', AdminSchema);
