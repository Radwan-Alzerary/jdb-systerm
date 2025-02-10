const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, authorizeRoles('full', 'college'), departmentController.createDepartment);
router.get('/', authenticateToken, authorizeRoles('full', 'college', 'department'), departmentController.getDepartments);
router.get('/:id', authenticateToken, authorizeRoles('full', 'college', 'department'), departmentController.getDepartmentById);
router.put('/:id', authenticateToken, authorizeRoles('full', 'college'), departmentController.updateDepartment);
router.delete('/:id', authenticateToken, authorizeRoles('full', 'college'), departmentController.deleteDepartment);

module.exports = router;
