const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Position', PositionSchema);
