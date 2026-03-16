const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST /api/bookings
router.post('/', bookingController.createBooking);

// DELETE /api/bookings/:id/permanent
router.delete('/:id/permanent', bookingController.deleteBooking);

// GET /api/bookings/:userId
router.get('/:userId', bookingController.getUserBookings);

// DELETE /api/bookings/:id
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;
