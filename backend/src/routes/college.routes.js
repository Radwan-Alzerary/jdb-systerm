const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/college.controller');

router.post('/', collegeController.createCollege);
router.get('/', collegeController.getColleges);
router.get('/:id', collegeController.getCollegeById);
router.put('/:id', collegeController.updateCollege);
router.delete('/:id', collegeController.deleteCollege);

module.exports = router;
