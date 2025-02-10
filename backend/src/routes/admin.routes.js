const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

// For example, only super admin and college admin can create new admins
router.post('/', authenticateToken, authorizeRoles('full', 'college'), adminController.createAdmin);
router.get('/', authenticateToken, authorizeRoles('full'), adminController.getAdmins);
router.get('/:id', authenticateToken, authorizeRoles('full', 'college', 'department'), adminController.getAdminById);
router.put('/:id', authenticateToken, authorizeRoles('full', 'college'), adminController.updateAdmin);
router.delete('/:id', authenticateToken, authorizeRoles('full'), adminController.deleteAdmin);

module.exports = router;
