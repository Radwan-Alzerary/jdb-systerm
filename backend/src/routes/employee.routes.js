const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, authorizeRoles('full', 'department'), employeeController.createEmployee);
router.get('/', authenticateToken, authorizeRoles('full', 'college', 'department'), employeeController.getEmployees);
router.get('/:id', authenticateToken, authorizeRoles('full', 'college', 'department'), employeeController.getEmployeeById);
router.put('/:id', authenticateToken, authorizeRoles('full', 'department'), employeeController.updateEmployee);
router.delete('/:id', authenticateToken, authorizeRoles('full', 'department'), employeeController.deleteEmployee);

module.exports = router;
