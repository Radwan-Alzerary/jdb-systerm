const express = require('express');
const router = express.Router();
const jobGradeController = require('../controllers/jobGrade.controller');

router.post('/', jobGradeController.createJobGrade);
router.get('/', jobGradeController.getJobGrades);
router.get('/:id', jobGradeController.getJobGradeById);
router.put('/:id', jobGradeController.updateJobGrade);
router.delete('/:id', jobGradeController.deleteJobGrade);

module.exports = router;
