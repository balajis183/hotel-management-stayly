# Hotel Management System (MERN)

A simple, clean hotel room booking system built with the MERN stack
(MongoDB, Express, React, Node.js). Users can register, browse rooms,
and book them. Admins can manage rooms and booking statuses.

## Tech Stack

- **Frontend:** ReactJS (Create React App), React Router DOM, Axios, Plain CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose
- **Auth:** JWT

## Project Structure

```
.
├── backend/        # Express + Mongoose API
└── frontend/       # React (CRA) client
```

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `backend/.env` and replace `<db_password>` and `<db_user>` with your MongoDB Atlas credentials :

```env
PORT=5000
MONGO_URI=mongodb+srv://db_user:<db_password>@cluster0.b0m7vzb.mongodb.net/hotel_management
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
```

Seed sample rooms (optional but recommended):

```bash
npm run seed
```

Start the backend:

```bash
npm run dev      # with nodemon
# or
npm start
```

The API runs on `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app runs on `http://localhost:3000` and talks to the API at
`http://localhost:5000/api`.

## Default Admin Login

The admin account is created automatically the first time you log in with
these credentials (no admin registration page needed):

- **Email:** `admin@gmail.com`
- **Password:** `admin123`

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Rooms
- `GET /api/rooms`
- `GET /api/rooms/:id`
- `POST /api/rooms` (admin)
- `PUT /api/rooms/:id` (admin)
- `DELETE /api/rooms/:id` (admin)

### Bookings
- `POST /api/bookings` (user)
- `GET /api/bookings/my` (user)
- `GET /api/bookings` (admin)
- `PUT /api/bookings/:id/status` (admin)

## Features

**User**
- Register & login
- Browse available rooms
- View room details
- Book a room (status starts as Pending)
- Track booking status in My Bookings

**Admin**
- Dashboard with summary cards
- Add / edit / delete rooms
- View all bookings
- Update booking status (Pending / Confirmed / Cancelled)
```
