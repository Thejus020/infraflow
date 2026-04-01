const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  pipelineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline', required: true },
  buildNumber: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'running', 'success', 'failed'], default: 'pending' },
  logs: { type: String, default: '' } // This will hold that cool terminal output!
}, { timestamps: true });

module.exports = mongoose.model('Build', buildSchema);