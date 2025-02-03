const express = require('express');
const router = express.Router();
const departmentRequirementController = require('../controllers/departmentRequirement.controller');

router.post('/', departmentRequirementController.createDepartmentRequirement);
router.get('/', departmentRequirementController.getDepartmentRequirements);
router.get('/:id', departmentRequirementController.getDepartmentRequirementById);
router.put('/:id', departmentRequirementController.updateDepartmentRequirement);
router.delete('/:id', departmentRequirementController.deleteDepartmentRequirement);

module.exports = router;
