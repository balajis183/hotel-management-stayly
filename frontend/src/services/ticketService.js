// Utility function to generate and download booking ticket
export const downloadBookingTicket = (booking, room) => {
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

  const ticketHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Booking Ticket - ${booking._id}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f5f5;
          padding: 20px;
        }
        .ticket-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .ticket-header {
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .ticket-header h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .ticket-header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .ticket-content {
          padding: 30px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          background: #f9f9f9;
          color: #0f766e;
          padding: 10px 15px;
          border-left: 4px solid #0f766e;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .info-item {
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 12px;
        }
        .info-label {
          color: #666;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .info-value {
          color: #333;
          font-size: 16px;
          font-weight: 500;
        }
        .booking-id {
          font-family: 'Courier New', monospace;
          background: #f5f5f5;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 13px;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-pending {
          background: #fef3c7;
          color: #d97706;
        }
        .status-confirmed {
          background: #d1fae5;
          color: #059669;
        }
        .status-cancelled {
          background: #fee2e2;
          color: #dc2626;
        }
        .price-summary {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #0f766e;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .price-row.total {
          border-top: 2px solid #ddd;
          padding-top: 10px;
          margin-top: 10px;
          font-weight: 700;
          font-size: 16px;
          color: #0f766e;
        }
        .ticket-footer {
          background: #f9f9f9;
          padding: 20px 30px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
          font-size: 12px;
          color: #999;
        }
        .qr-section {
          text-align: center;
          padding: 20px 0;
          border-top: 1px solid #f0f0f0;
        }
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .ticket-container {
            box-shadow: none;
            max-width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="ticket-container">
        <div class="ticket-header">
          <h1>🏨 BOOKING TICKET</h1>
          <p>Stayly Hotel Management System</p>
        </div>

        <div class="ticket-content">
          <div class="section">
            <div class="section-title">Booking Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Booking ID</div>
                <div class="info-value booking-id">${booking._id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge status-${booking.bookingStatus?.toLowerCase()}">
                    ${booking.bookingStatus || "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Room Details</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Room Type</div>
                <div class="info-value">${room?.roomType || "N/A"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Room Number</div>
                <div class="info-value">${room?.roomNumber || "N/A"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Capacity</div>
                <div class="info-value">${room?.capacity || "N/A"} Guests</div>
              </div>
              <div class="info-item">
                <div class="info-label">Price per Night</div>
                <div class="info-value">₹${room?.price || 0}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Stay Details</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Check-in Date</div>
                <div class="info-value">${formatDate(booking.checkInDate)}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Check-out Date</div>
                <div class="info-value">${formatDate(booking.checkOutDate)}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Number of Nights</div>
                <div class="info-value">${nights}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Price Summary</div>
            <div class="price-summary">
              <div class="price-row">
                <span>Price per Night</span>
                <span>₹${room?.price || 0}</span>
              </div>
              <div class="price-row">
                <span>Number of Nights</span>
                <span>${nights}</span>
              </div>
              <div class="price-row total">
                <span>Total Amount</span>
                <span>₹${totalPrice}</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Important Information</div>
            <div style="font-size: 13px; line-height: 1.8; color: #555;">
              <p style="margin-bottom: 10px;">
                <strong>• Check-in Time:</strong> 2:00 PM (or as per availability)
              </p>
              <p style="margin-bottom: 10px;">
                <strong>• Check-out Time:</strong> 11:00 AM
              </p>
              <p style="margin-bottom: 10px;">
                <strong>• Cancellation Policy:</strong> Free cancellation up to 48 hours before check-in
              </p>
              <p>
                <strong>• Need Help?</strong> Contact our support team at support@stayly.com
              </p>
            </div>
          </div>
        </div>

        <div class="ticket-footer">
          <p>Generated on ${new Date().toLocaleString()}</p>
          <p>Thank you for choosing Stayly! We look forward to your stay.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create a blob and download
  const blob = new Blob([ticketHTML], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Booking_Ticket_${booking._id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
