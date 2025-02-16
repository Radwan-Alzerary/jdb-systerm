const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');

router.post('/', certificateController.createCertificate);
router.get('/', certificateController.getCertificates);
router.get('/:id', certificateController.getCertificateById);
router.put('/:id', certificateController.updateCertificate);
router.delete('/:id', certificateController.deleteCertificate);

module.exports = router;
