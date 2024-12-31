const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/test-user', async (req, res) => {
  try {
    const testUser = await User.findOne({ email: 'user1@gmail.com' });
    res.json({
      exists: !!testUser,
      user: testUser ? {
        email: testUser.email,
        password: testUser.password
      } : null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;