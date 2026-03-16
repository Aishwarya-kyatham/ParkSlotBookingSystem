const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slotNumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['car', 'bike'], default: 'car' },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' }
});

module.exports = mongoose.model('Slot', slotSchema);
