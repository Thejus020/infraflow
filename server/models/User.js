const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String },
  accessToken: { type: String } // We need this to talk to GitHub on their behalf!
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);