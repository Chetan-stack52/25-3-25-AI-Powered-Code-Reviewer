const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');
const User = require('../models/User');

router.get('/users', requireAuth, requireRole('admin'), async (req, res) => {
  const users = await User.find().select('-passwordHash -refreshTokenHash');
  res.send({ users });
});

module.exports = router;