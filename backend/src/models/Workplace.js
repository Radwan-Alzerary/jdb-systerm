const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkplaceSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Workplace', WorkplaceSchema);
