const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/college.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, authorizeRoles('full'), collegeController.createCollege);
router.get('/', authenticateToken, authorizeRoles('full', 'college'), collegeController.getColleges);
router.get('/:id', authenticateToken, authorizeRoles('full', 'college'), collegeController.getCollegeById);
router.put('/:id', authenticateToken, authorizeRoles('full', 'college'), collegeController.updateCollege);
router.delete('/:id', authenticateToken, authorizeRoles('full'), collegeController.deleteCollege);

module.exports = router;
