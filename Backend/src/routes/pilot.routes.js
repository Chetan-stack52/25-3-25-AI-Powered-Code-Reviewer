const express = require('express');
const router = express.Router();
const pilotController = require('../controllers/pilot.controllers');

router.post('/request', pilotController.requestPilot);

module.exports = router;