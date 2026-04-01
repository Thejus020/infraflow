import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AuthSuccess from "./pages/AuthSuccess";
import NewPipeline from "./pages/NewPipeline";
import PipelineDetail from "./pages/PipelineDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth/success" element={<AuthSuccess />} />
      <Route path="/pipelines/new" element={<NewPipeline />} />
      <Route path="/pipelines/:id" element={<PipelineDetail />} />
    </Routes>
  );
}

export default App;