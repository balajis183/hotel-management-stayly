import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const statusClass = (status) => {
    if (status === "Confirmed") return "badge-confirmed";
    if (status === "Cancelled") return "badge-cancelled";
    return "badge-pending";
  };

  return (
    <div className="my-bookings">
      <div className="my-bookings-container">
        <h1 className="page-title">My Bookings</h1>
        <p className="page-subtitle">Track the status of your room bookings.</p>

        {loading && <p className="status-message">Loading...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!loading && !error && bookings.length === 0 && (
          <p className="status-message">
            You have no bookings yet. Browse rooms to get started.
          </p>
        )}

        {bookings.length > 0 && (
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Room Number</th>
                  <th>Room Type</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.room?.roomNumber || "N/A"}</td>
                    <td>{booking.room?.roomType || "N/A"}</td>
                    <td>{formatDate(booking.checkInDate)}</td>
                    <td>{formatDate(booking.checkOutDate)}</td>
                    <td>
                      <span
                        className={`status-badge-table ${statusClass(
                          booking.bookingStatus
                        )}`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
