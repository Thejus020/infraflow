import { useNavigate, useParams } from 'react-router-dom'

function BuildView() {
  const { id, buildId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">⚡ InfraFlow</h1>
        <button onClick={() => navigate(`/pipelines/${id}`)} className="text-gray-400 hover:text-white transition">
          ← Back to Pipeline
        </button>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-2">Build Logs</h2>
        <p className="text-gray-400 mb-8">Build #{buildId}</p>
        <div className="bg-black border border-gray-800 rounded-xl p-6 font-mono text-sm text-green-400 min-h-64">
          <p>$ Waiting for build logs...</p>
        </div>
      </div>
    </div>
  )
}

export default BuildView