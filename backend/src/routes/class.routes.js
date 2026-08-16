const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { createClassSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', authorizeRoles('ADMIN', 'TEACHER'), validate(createClassSchema), classController.createClass);
router.put('/:id', authorizeRoles('ADMIN', 'TEACHER'), classController.updateClass);
router.delete('/:id', authorizeRoles('ADMIN'), classController.deleteClass);

module.exports = router;
