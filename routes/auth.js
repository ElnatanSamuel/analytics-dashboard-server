const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Debug log
    
    const user = await User.findOne({ email });
    console.log('Found user:', user); // Debug log
    
    if (!user) {
      console.log('User not found'); // Debug log
      return res.status(400).json({ message: 'Invalid credentials - User not found' });
    }

    console.log('Comparing passwords:', { 
      provided: password, 
      stored: user.password 
    }); // Debug log

    if (password !== user.password) {
      console.log('Password mismatch'); // Debug log
      return res.status(400).json({ message: 'Invalid credentials - Password mismatch' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1d'
    });

    console.log('Login successful'); // Debug log
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;