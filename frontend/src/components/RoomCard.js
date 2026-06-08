import React from "react";
import { Link } from "react-router-dom";
import "../styles/RoomCard.css";

function RoomCard({ room }) {
  const isAvailable = room.status === "Available";

  return (
    <div className="room-card">
      <div className="room-card-image">
        <img
          src={room.image || "https://via.placeholder.com/400x250?text=Hotel+Room"}
          alt={`Room ${room.roomNumber} - ${room.roomType}`}
        />
        <span
          className={`room-status-badge ${
            isAvailable ? "status-available" : "status-unavailable"
          }`}
        >
          {room.status}
        </span>
      </div>

      <div className="room-card-body">
        <div className="room-card-header">
          <h3 className="room-type">{room.roomType}</h3>
          <span className="room-number">Room {room.roomNumber}</span>
        </div>

        <div className="room-card-footer">
          <span className="room-price">
            &#8377;{room.price}
            <span className="room-price-unit"> / night</span>
          </span>
          <Link to={`/rooms/${room._id}`} className="btn-view-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
