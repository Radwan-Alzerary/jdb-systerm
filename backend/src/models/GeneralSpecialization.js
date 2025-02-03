const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeneralSpecializationSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('GeneralSpecialization', GeneralSpecializationSchema);
