const express = require('express');
const router = express.Router();
const subspecialtyController = require('../controllers/subspecialty.controller');

router.post('/', subspecialtyController.createSubspecialty);
router.get('/', subspecialtyController.getSubspecialties);
router.get('/:id', subspecialtyController.getSubspecialtyById);
router.put('/:id', subspecialtyController.updateSubspecialty);
router.delete('/:id', subspecialtyController.deleteSubspecialty);

module.exports = router;
