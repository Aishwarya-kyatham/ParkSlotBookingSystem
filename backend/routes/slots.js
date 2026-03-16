const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

// GET /api/slots
router.get('/', slotController.getAllSlots);

// GET /api/slots/available
router.get('/available', slotController.getAvailableSlots);

// POST /api/slots/seed (temporary, for initial data)
router.post('/seed', slotController.seedSlots);

module.exports = router;
