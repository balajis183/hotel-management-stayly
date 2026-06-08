import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { isLoggedIn } from "../services/auth";
import "../styles/RoomDetails.css";

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        setError("Failed to load room details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingMessage("");
    setBookingError("");

    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setBookingError("Please select both dates.");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setBookingError("Check-out date must be after check-in date.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/bookings", {
        room: id,
        checkInDate,
        checkOutDate,
      });
      // Redirect to booking confirmation page with booking details
      navigate("/booking-confirmation", { 
        state: { 
          booking: res.data,
          room: room
        } 
      });
    } catch (err) {
      setBookingError(
        err.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!room) return <p className="status-message">Room not found.</p>;

  const isAvailable = room.status === "Available";

  return (
    <div className="room-details">
      <div className="room-details-container">
        <div className="room-details-image">
          <img
            src={
              room.image ||
              "https://via.placeholder.com/600x400?text=Hotel+Room"
            }
            alt={`Room ${room.roomNumber}`}
          />
        </div>

        <div className="room-details-info">
          <div className="room-details-header">
            <h1>{room.roomType} Room</h1>
            <span
              className={`room-status-badge ${
                isAvailable ? "status-available" : "status-unavailable"
              }`}
            >
              {room.status}
            </span>
          </div>

          <ul className="room-meta">
            <li>
              <span>Room Number</span>
              <strong>{room.roomNumber}</strong>
            </li>
            <li>
              <span>Capacity</span>
              <strong>{room.capacity} Guests</strong>
            </li>
            <li>
              <span>Price</span>
              <strong>&#8377;{room.price} / night</strong>
            </li>
          </ul>

          <p className="room-description">
            {room.description || "No description available for this room."}
          </p>

          <div className="booking-box">
            <h3>Book This Room</h3>

            {bookingMessage && (
              <div className="booking-success">{bookingMessage}</div>
            )}
            {bookingError && (
              <div className="booking-error">{bookingError}</div>
            )}

            <form onSubmit={handleBooking} className="booking-form">
              <div className="form-group">
                <label htmlFor="checkIn">Check-in Date</label>
                <input
                  type="date"
                  id="checkIn"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkOut">Check-out Date</label>
                <input
                  type="date"
                  id="checkOut"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-book"
                disabled={!isAvailable || submitting}
              >
                {!isAvailable
                  ? "Not Available"
                  : submitting
                  ? "Booking..."
                  : "Book Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
