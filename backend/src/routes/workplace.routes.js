const express = require('express');
const router = express.Router();
const workplaceController = require('../controllers/workplace.controller');

router.post('/', workplaceController.createWorkplace);
router.get('/', workplaceController.getWorkplaces);
router.get('/:id', workplaceController.getWorkplaceById);
router.put('/:id', workplaceController.updateWorkplace);
router.delete('/:id', workplaceController.deleteWorkplace);

module.exports = router;
