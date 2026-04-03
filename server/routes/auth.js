const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 1. Redirect user to GitHub
router.get('/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=https://infraflow-backend.onrender.com/auth/github/callback&scope=repo,user`;
  res.redirect(githubAuthUrl);
});

// 2. GitHub callback
router.get('/github/callback', async (req, res) => {
  try {
    const { code } = req.query;

    // Exchange code → access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get GitHub user
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const githubUser = userResponse.data;

    // Save user
    let user = await User.findOne({ githubId: githubUser.id });

    if (!user) {
      user = await User.create({
        githubId: githubUser.id,
        username: githubUser.login,
        avatar: githubUser.avatar_url,
        accessToken
      });
    } else {
      user.accessToken = accessToken;
      await user.save();
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ REDIRECT TO FRONTEND
    res.redirect(`https://infraflow-frontend.onrender.com/auth/success?token=${token}`);

  } catch (error) {
    console.error('GitHub Auth Error:', error);
    res.redirect('https://infraflow-frontend.onrender.com/');
  }
});

// 3. Get current user
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-accessToken');
    res.json(user);

  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;