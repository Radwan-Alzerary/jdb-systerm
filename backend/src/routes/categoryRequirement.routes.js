const express = require('express');
const router = express.Router();
const categoryRequirementController = require('../controllers/categoryRequirement.controller');

router.post('/', categoryRequirementController.createCategoryRequirement);
router.get('/', categoryRequirementController.getCategoryRequirements);
router.get('/:id', categoryRequirementController.getCategoryRequirementById);
router.put('/:id', categoryRequirementController.updateCategoryRequirement);
router.delete('/:id', categoryRequirementController.deleteCategoryRequirement);

module.exports = router;
