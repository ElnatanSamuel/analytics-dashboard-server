const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/', analyticsController.getAnalytics);
router.get('/dashboard-stats', analyticsController.getDashboardStats);

module.exports = router;