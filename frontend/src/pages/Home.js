import React, { useEffect, useState } from "react";
import api from "../services/api";
import RoomCard from "../components/RoomCard";
import "../styles/Home.css";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        setError("Failed to load rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Experience Comfort &amp; Luxury at Stayly
          </h1>
          <p className="hero-subtitle">
            Discover beautifully designed rooms, exceptional service, and a
            stay you will never forget. Book your perfect room in just a few
            clicks.
          </p>
          <a href="#rooms" className="btn-hero">
            Explore Rooms
          </a>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro">
        <div className="intro-container">
          <h2 className="section-title">Welcome to Stayly Hotel</h2>
          <p className="intro-text">
            Nestled in the heart of the city, Stayly offers a perfect blend of
            modern comfort and timeless elegance. Whether you are traveling for
            business or leisure, our rooms are designed to make you feel right
            at home.
          </p>
          <div className="intro-features">
            <div className="feature-card">
              <h3>Prime Location</h3>
              <p>Steps away from city attractions, dining, and shopping.</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Service</h3>
              <p>Our friendly staff is always ready to assist you.</p>
            </div>
            <div className="feature-card">
              <h3>Best Price</h3>
              <p>Guaranteed comfortable rooms at affordable rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Rooms */}
      <section className="rooms-section" id="rooms">
        <div className="rooms-container">
          <h2 className="section-title">Available Rooms</h2>
          <p className="section-subtitle">
            Choose from our selection of carefully designed rooms.
          </p>

          {loading && <p className="status-message">Loading rooms...</p>}
          {error && <p className="status-message error">{error}</p>}
          {!loading && !error && rooms.length === 0 && (
            <p className="status-message">No rooms available at the moment.</p>
          )}

          <div className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
