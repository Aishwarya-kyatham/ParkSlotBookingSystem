const Slot = require('../models/Slot');

// Get all slots
exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available slots
exports.getAvailableSlots = async (req, res) => {
  try {
    // In a real application, we'd check bookings for the requested time.
    // For simplicity, we just check the current status of the slots.
    const availableSlots = await Slot.find({ status: 'available' });
    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seed initial slots (Helper function for testing)
exports.seedSlots = async (req, res) => {
  try {
    const slots = [
      { slotNumber: 'A1', location: 'Level 1', type: 'car' },
      { slotNumber: 'A2', location: 'Level 1', type: 'car' },
      { slotNumber: 'B1', location: 'Level 1', type: 'bike' },
      { slotNumber: 'B2', location: 'Level 1', type: 'bike' },
      { slotNumber: 'C1', location: 'Level 2', type: 'car' },
      { slotNumber: 'C2', location: 'Level 2', type: 'car' }
    ];
    for (const slot of slots) {
      await Slot.updateOne({ slotNumber: slot.slotNumber }, { $set: slot }, { upsert: true });
    }
    res.status(201).json({ message: 'Slots seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
