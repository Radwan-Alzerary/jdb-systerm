const Certificate = require('../models/Certificate');

exports.createCertificate = async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    const savedCertificate = await certificate.save();
    res.status(201).json(savedCertificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCertificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(updatedCertificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!deletedCertificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
