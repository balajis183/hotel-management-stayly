import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/BookingConfirmation.css";

function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;
  const room = location.state?.room;

  if (!booking) {
    return (
      <div className="booking-confirmation">
        <div className="confirmation-container">
          <div className="error-state">
            <h2>No Booking Found</h2>
            <p>Please make a booking to view confirmation details.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const nights = Math.ceil(
    (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) /
      (1000 * 60 * 60 * 24)
  );
  const totalPrice = room?.price ? room.price * nights : 0;

  return (
    <div className="booking-confirmation">
      <div className="confirmation-container">
        <div className="confirmation-success">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p className="success-message">
            Your booking request has been received. Please wait for admin
            confirmation.
          </p>
        </div>

        <div className="booking-details-card">
          <h2>Booking Details</h2>

          <div className="detail-section">
            <div className="detail-row">
              <span className="detail-label">Booking ID</span>
              <span className="detail-value booking-id">{booking._id}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className={`status-badge status-${booking.bookingStatus?.toLowerCase()}`}>
                {booking.bookingStatus || "Pending"}
              </span>
            </div>
          </div>

          <hr className="divider" />

          <h3>Room Information</h3>
          <div className="detail-section">
            <div className="detail-row">
              <span className="detail-label">Room Type</span>
              <span className="detail-value">{room?.roomType}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Room Number</span>
              <span className="detail-value">{room?.roomNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Capacity</span>
              <span className="detail-value">{room?.capacity} Guests</span>
            </div>
          </div>

          <hr className="divider" />

          <h3>Stay Details</h3>
          <div className="detail-section">
            <div className="detail-row">
              <span className="detail-label">Check-in Date</span>
              <span className="detail-value">
                {formatDate(booking.checkInDate)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Check-out Date</span>
              <span className="detail-value">
                {formatDate(booking.checkOutDate)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Number of Nights</span>
              <span className="detail-value">{nights}</span>
            </div>
          </div>

          <hr className="divider" />

          <h3>Price Summary</h3>
          <div className="detail-section">
            <div className="detail-row">
              <span className="detail-label">Price per Night</span>
              <span className="detail-value">₹{room?.price}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Number of Nights</span>
              <span className="detail-value">{nights}</span>
            </div>
            <div className="detail-row total-row">
              <span className="detail-label">Total Price</span>
              <span className="detail-value">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-message">
          <p>
            <strong>What happens next?</strong>
          </p>
          <ul>
            <li>
              The admin will review your booking within 1-2 hours
            </li>
            <li>You'll receive an email once your booking is confirmed</li>
            <li>
              You can track your booking status in{" "}
              <Link to="/my-bookings">My Bookings</Link>
            </li>
            <li>
              If you have any questions, please contact our support team
            </li>
          </ul>
        </div>

        <div className="confirmation-actions">
          <Link to="/my-bookings" className="btn btn-primary">
            View All Bookings
          </Link>
          <Link to="/" className="btn btn-secondary">
            Browse More Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
