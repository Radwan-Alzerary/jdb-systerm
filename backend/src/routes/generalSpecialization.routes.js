const express = require('express');
const router = express.Router();
const generalSpecializationController = require('../controllers/generalSpecialization.controller');

router.post('/', generalSpecializationController.createGeneralSpecialization);
router.get('/', generalSpecializationController.getGeneralSpecializations);
router.get('/:id', generalSpecializationController.getGeneralSpecializationById);
router.put('/:id', generalSpecializationController.updateGeneralSpecialization);
router.delete('/:id', generalSpecializationController.deleteGeneralSpecialization);

module.exports = router;
