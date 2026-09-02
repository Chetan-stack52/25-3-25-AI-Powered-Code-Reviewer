const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/verify', authController.verify);
router.post('/request-reset', authController.requestReset);
router.post('/reset-password', authController.resetPassword);
const { requireAuth } = require('../middleware/auth.middleware');
router.get('/me', requireAuth, authController.me);

module.exports = router;