const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  visitors: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  bounceRate: { type: Number, default: 0 },
  avgSessionDuration: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
  newUsers: { type: Number, default: 0 },
  returningUsers: { type: Number, default: 0 },
  topDevices: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);