const Booking = require('../models/Booking');
const Slot = require('../models/Slot');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, slotId, date, startTime, endTime } = req.body;

    // Check if slot is already booked for this time
    const overlappingBooking = await Booking.findOne({
      slotId,
      date,
      status: 'active',
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Slot is already booked for this time period.' });
    }

    const newBooking = new Booking({
      userId,
      slotId,
      date,
      startTime,
      endTime
    });

    await newBooking.save();
    
    // Update the slot status to occupied so it reflects on the home page map
    await Slot.findByIdAndUpdate(slotId, { status: 'occupied' });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate('slotId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // When a booking is cancelled, free up the slot so others can book it again
    await Slot.findByIdAndUpdate(booking.slotId, { status: 'available' });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Permanently delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
