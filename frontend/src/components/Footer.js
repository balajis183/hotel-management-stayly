import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Stayly</h3>
          <p>Your comfort, our priority. Book your perfect stay with ease.</p>
        </div>
        <div className="footer-info">
          <p>123 Garden Avenue, City Center</p>
          <p>contact@stayly.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Stayly Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
