const mongoose = require('mongoose');
const Analytics = require('../models/Analytics');
require('dotenv').config();

const generateRandomData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const visitors = Math.floor(Math.random() * 1000) + 500;
      const newUsers = Math.floor(visitors * 0.6);
      const returningUsers = visitors - newUsers;
      
      data.push({
        visitors,
        pageViews: Math.floor(Math.random() * 2000) + 1000,
        revenue: Math.floor(Math.random() * 10000) + 5000,
        orders: Math.floor(Math.random() * 100) + 50,
        bounceRate: Math.floor(Math.random() * 30) + 20,
        avgSessionDuration: Math.floor(Math.random() * 300) + 120,
        newUsers,
        returningUsers,
        conversionRate: Math.random() * 5 + 1,
        topDevices: {
          desktop: Math.floor(Math.random() * 500) + 200,
          mobile: Math.floor(Math.random() * 400) + 200,
          tablet: Math.floor(Math.random() * 100) + 50
        },
        date
      });
    }
    
    return data;
  };

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://ktk2real:krosection999@cluster0.abfalpl.mongodb.net/internshiptest?retryWrites=true&w=majority");
    console.log('Connected to MongoDB');

    await Analytics.deleteMany({}); // Clear existing data
    const analyticsData = generateRandomData();
    await Analytics.insertMany(analyticsData);
    
    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();