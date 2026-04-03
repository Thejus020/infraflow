const axios = require("axios");

const runPipeline = async (req, res) => {
  try {
    await axios.post(
      "http://localhost:8080/job/Infraflow/build",
      {},
      {
        auth: {
          username: "Thejus",
          password: "114079a7b221b7e0f36c940b4becae86db",
        },
      }
    );

    res.json({ message: "🚀 Pipeline triggered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Failed to trigger pipeline" });
  }
};

module.exports = { runPipeline };