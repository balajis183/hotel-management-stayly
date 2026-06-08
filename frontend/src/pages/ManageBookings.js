import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ManageBookings.css";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleStatusChange = async (id, bookingStatus) => {
    setMessage("");
    setError("");
    try {
      await api.put(`/bookings/${id}/status`, { bookingStatus });
      setMessage("Booking status updated.");
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, bookingStatus } : b))
      );
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  return (
    <div className="manage-bookings">
      <div className="admin-container">
        <h1 className="page-title">Manage Bookings</h1>
        <p className="page-subtitle">
          View all bookings and update their status.
        </p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <p className="status-message">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="status-message">No bookings found.</p>
        ) : (
          <div className="bookings-table-wrapper">
            <table className="admin-bookings-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Room Number</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user?.name || "N/A"}</td>
                    <td>{booking.room?.roomNumber || "N/A"}</td>
                    <td>{formatDate(booking.checkInDate)}</td>
                    <td>{formatDate(booking.checkOutDate)}</td>
                    <td>
                      <span
                        className={`status-pill status-${booking.bookingStatus.toLowerCase()}`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        value={booking.bookingStatus}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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

export default ManageBookings;
