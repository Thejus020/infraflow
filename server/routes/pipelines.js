// 🚀 RUN PIPELINE (SIMULATION)
router.post("/:id/run", auth, async (req, res) => {
  const pipeline = await Pipeline.findById(req.params.id);

  if (!pipeline) return res.status(404).json({ message: "Not found" });

  // Set to running
  pipeline.status = "running";
  await pipeline.save();

  // Simulate build (5 sec)
  setTimeout(async () => {
    pipeline.status = "success";
    await pipeline.save();
  }, 5000);

  res.json({ message: "Pipeline started" });
});