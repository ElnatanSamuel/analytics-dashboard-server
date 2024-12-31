const Analytics = require('../models/Analytics');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find()
      .sort({ date: -1 })
      .limit(30);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);

    const monthlyStats = await Analytics.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$revenue" },
          totalOrders: { $sum: "$orders" },
          totalVisitors: { $sum: "$visitors" },
          avgPageViews: { $avg: "$pageViews" }
        }
      }
    ]);

    res.json(monthlyStats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};