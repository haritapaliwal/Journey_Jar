const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Destination = require('../models/Destination');
const destinations = require('../data/destinations.json');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDestinations = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Destination.deleteMany();
    console.log('Cleared existing destinations');

    await Destination.insertMany(destinations);
    console.log('Destinations seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding destinations:', error);
    process.exit(1);
  }
};

seedDestinations();
