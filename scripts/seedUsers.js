const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const users = [
  {
    name: 'Test User',
    email: 'user1@gmail.com',
    password: 'user1234',  // Plain password
    role: 'user',
    status: 'active',
    lastLogin: new Date()
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect("mongodb+srv://ktk2real:krosection999@cluster0.abfalpl.mongodb.net/internshiptest?retryWrites=true&w=majority");
    
    await User.deleteMany({});
    await User.insertMany(users);
    
    console.log('Users seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();