const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 1. Redirect user to GitHub's login page
router.get('/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user`;
  res.redirect(githubAuthUrl);
});

// 2. GitHub sends the user back here with a code
router.get('/github/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    // Exchange the code for an access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    }, { headers: { Accept: 'application/json' } });

    const accessToken = tokenResponse.data.access_token;

    // Fetch the user's profile from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const githubUser = userResponse.data;

    // Find the user in our database, or create a new one!
    let user = await User.findOne({ githubId: githubUser.id });
    if (!user) {
      user = await User.create({
        githubId: githubUser.id,
        username: githubUser.login,
        avatar: githubUser.avatar_url,
        accessToken: accessToken
      });
    } else {
      user.accessToken = accessToken;
      await user.save();
    }

    // Create a secure token for our React frontend
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Send them back to the React app with the token!
    res.redirect(`http://infraflow-backend.onrender.com/auth/success?token=${token}`);
  } catch (error) {
    console.error('GitHub Auth Error:', error);
    res.redirect('http://infraflow-backend.onrender.com/auth/failed');
  }
});

// 3. Route for the frontend to get the currently logged-in user
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-accessToken');
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;