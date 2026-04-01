const pipelineSchema = new mongoose.Schema({
  name: String,
  repoUrl: String,
  branch: String,
  userId: String,
  status: {
    type: String,
    default: "idle", // idle | running | success | failed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});