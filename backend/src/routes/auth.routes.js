const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken } = require('../middleware/auth.middleware');
const { registerSchema, loginSchema } = require('../utils/validation.schemas');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;
