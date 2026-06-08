import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ManageRooms.css";

const emptyForm = {
  roomNumber: "",
  roomType: "",
  price: "",
  capacity: "",
  description: "",
  image: "",
  status: "Available",
};

function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      setError("Failed to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const payload = {
      ...form,
      price: Number(form.price),
      capacity: Number(form.capacity),
    };

    try {
      if (editingId) {
        await api.put(`/rooms/${editingId}`, payload);
        setMessage("Room updated successfully.");
      } else {
        await api.post("/rooms", payload);
        setMessage("Room added successfully.");
      }
      resetForm();
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    }
  };

  const handleEdit = (room) => {
    setEditingId(room._id);
    setForm({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      price: room.price,
      capacity: room.capacity,
      description: room.description || "",
      image: room.image || "",
      status: room.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      setMessage("Room deleted successfully.");
      fetchRooms();
    } catch (err) {
      setError("Failed to delete room.");
    }
  };

  return (
    <div className="manage-rooms">
      <div className="admin-container">
        <h1 className="page-title">Manage Rooms</h1>
        <p className="page-subtitle">Add, edit, or remove hotel rooms.</p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="room-form-card">
          <h3>{editingId ? "Edit Room" : "Add New Room"}</h3>
          <form onSubmit={handleSubmit} className="room-form">
            <div className="form-row">
              <div className="form-group">
                <label>Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={form.roomNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Room Type</label>
                <input
                  type="text"
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                  placeholder="Single, Double, Deluxe..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (per night)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {editingId && (
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update Room" : "Add Room"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <h3 className="list-title">All Rooms</h3>
        {loading ? (
          <p className="status-message">Loading...</p>
        ) : (
          <div className="rooms-table-wrapper">
            <table className="rooms-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomType}</td>
                    <td>&#8377;{room.price}</td>
                    <td>{room.capacity}</td>
                    <td>{room.status}</td>
                    <td className="table-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(room)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(room._id)}
                      >
                        Delete
                      </button>
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

export default ManageRooms;
