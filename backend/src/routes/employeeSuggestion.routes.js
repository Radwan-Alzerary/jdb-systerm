const express = require('express');
const router = express.Router();
const employeeSuggestionController = require('../controllers/employeeSuggestion.controller');

router.post('/', employeeSuggestionController.createEmployeeSuggestion);
router.get('/', employeeSuggestionController.getEmployeeSuggestions);
router.get('/:id', employeeSuggestionController.getEmployeeSuggestionById);
router.put('/:id', employeeSuggestionController.updateEmployeeSuggestion);
router.delete('/:id', employeeSuggestionController.deleteEmployeeSuggestion);

module.exports = router;
