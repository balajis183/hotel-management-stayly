const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// User
router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);

// Admin
router.get("/", authMiddleware, adminMiddleware, getAllBookings);
router.put("/:id/status", authMiddleware, adminMiddleware, updateBookingStatus);

module.exports = router;
