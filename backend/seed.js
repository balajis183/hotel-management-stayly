require("dotenv").config();
const connectDB = require("./config/db");
const Room = require("./models/Room");

const sampleRooms = [
  {
    roomNumber: "101",
    roomType: "Single",
    price: 1500,
    capacity: 1,
    description:
      "A cozy single room with a comfortable bed, work desk, and city view. Perfect for solo travelers.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
    status: "Available",
  },
  {
    roomNumber: "102",
    roomType: "Double",
    price: 2500,
    capacity: 2,
    description:
      "Spacious double room with a queen-size bed, seating area, and modern amenities for a relaxing stay.",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    status: "Available",
  },
  {
    roomNumber: "201",
    roomType: "Deluxe",
    price: 4000,
    capacity: 3,
    description:
      "Elegant deluxe room featuring premium furnishings, a large bathroom, and stunning views.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    status: "Available",
  },
  {
    roomNumber: "301",
    roomType: "Suite",
    price: 6500,
    capacity: 4,
    description:
      "Luxurious suite with a separate living room, king-size bed, and exclusive hotel services.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    status: "Available",
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Room.deleteMany();
    await Room.insertMany(sampleRooms);
    console.log("Sample rooms seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
