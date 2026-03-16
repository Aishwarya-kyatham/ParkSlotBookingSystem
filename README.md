# Smart Parking Slot Booking System

A full-stack MEAN application built with Angular 18, Node.js, Express, and MongoDB. This system allows users to view real-time availability of parking spaces, securely reserve a slot, and manage their bookings.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://park-slot-booking-system.vercel.app/](https://park-slot-booking-system.vercel.app/)
- **Backend API (Render):** `https://parkslotbookingsystem.onrender.com/api`

## 💻 Tech Stack
- **Frontend:** Angular 18, TypeScript, Tailwind CSS, built with Standalone Components.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Cloud NoSQL), Mongoose (ODM).

## ✨ Key Features
- **Real-Time Availability:** Slots dynamically update their status (Available/Booked).
- **Smart Booking Validation:** Prevents overlapping reservations and past-date bookings.
- **Dashboard Management:** Users can view, cancel, and permanently delete their booking history.
- **Premium UI:** Designed inside and out with a responsive, dark "Glassmorphism" aesthetic.

## 📂 Project Structure
```text
ParkSlotBookingSystem/
├── backend/                  # Node.js/Express API server
│   ├── controllers/          # Business logic for slots and bookings
│   ├── models/               # Mongoose schemas (User, Slot, Booking)
│   ├── routes/               # Express API endpoints
│   └── server.js             # Server entry point
└── frontend/                 # Angular web application
    └── src/
        └── app/              # Main application logic
            ├── components/   # UI Components (dashboard, slot-list, booking-form)
            └── services/     # API services for backend communication
```

## 🛠️ Local Development Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm start // Starts on http://localhost:3000
```
*Note: Make sure to create a `.env` file with your `MONGO_URI` connection string.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start // Starts Angular dev server on http://localhost:4200
```
*Note: To run the app fully locally, temporarily modify `frontend/src/app/services/parking.service.ts` to point back to `http://localhost:3000/api`.*
