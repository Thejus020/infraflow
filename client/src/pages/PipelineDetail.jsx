import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function PipelineDetail() {
  const { id } = useParams();

  return (
    <div className="flex">
      
      <Sidebar />

      <div className="flex-1 bg-gray-950 text-white p-6">

        <h1 className="text-2xl mb-4">Pipeline Logs</h1>

        <div className="bg-black p-4 rounded-lg font-mono text-sm space-y-2">
          <p>🚀 Starting build...</p>
          <p>📦 Installing dependencies...</p>
          <p>🔨 Building project...</p>
          <p>🐳 Creating Docker image...</p>
          <p>☁️ Deploying to server...</p>
          <p className="text-green-400">✅ Deployment successful!</p>
        </div>

      </div>
    </div>
  );
}

export default PipelineDetail;