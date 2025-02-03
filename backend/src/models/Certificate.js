const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Certificate', CertificateSchema);
