import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, bookingsRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/bookings"),
        ]);

        const rooms = roomsRes.data;
        const bookings = bookingsRes.data;

        setStats({
          totalRooms: rooms.length,
          availableRooms: rooms.filter((r) => r.status === "Available").length,
          totalBookings: bookings.length,
          pendingBookings: bookings.filter(
            (b) => b.bookingStatus === "Pending"
          ).length,
        });
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { label: "Total Rooms", value: stats.totalRooms, color: "card-teal" },
    {
      label: "Available Rooms",
      value: stats.availableRooms,
      color: "card-green",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      color: "card-blue",
    },
    {
      label: "Pending Bookings",
      value: stats.pendingBookings,
      color: "card-amber",
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Overview of hotel operations.</p>

        {loading && <p className="status-message">Loading...</p>}
        {error && <p className="status-message error">{error}</p>}

        {!loading && !error && (
          <div className="stats-grid">
            {cards.map((card) => (
              <div key={card.label} className={`stat-card ${card.color}`}>
                <span className="stat-value">{card.value}</span>
                <span className="stat-label">{card.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
