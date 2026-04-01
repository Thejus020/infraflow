import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [pipelines, setPipelines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 👤 User
    axios.get("http://localhost:5000/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setUser(res.data));

    // 📦 Pipelines
    axios.get("http://localhost:5000/pipelines", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setPipelines(res.data));

  }, []);

  const runPipeline = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(`http://localhost:5000/pipelines/${id}/run`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const res = await axios.get("http://localhost:5000/pipelines", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPipelines(res.data);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-950 text-white p-6">

        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {user && (
          <div className="flex items-center gap-4 mb-6 bg-gray-800 p-4 rounded-lg">
            <img src={user.avatar} className="w-12 h-12 rounded-full" />
            <h2>{user.username}</h2>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate("/pipelines/new")}
          className="bg-blue-500 px-5 py-2 rounded mb-6"
        >
          + Create Pipeline
        </button>

        <div className="space-y-4">
          {pipelines.map(p => (
            <div
              key={p._id}
              onClick={() => navigate(`/pipelines/${p._id}`)}
              className="bg-gray-800 p-4 rounded-lg flex justify-between cursor-pointer hover:bg-gray-700"
            >
              <div>
                <h3>{p.name}</h3>
                <p className="text-gray-400">{p.branch}</p>
              </div>

              <div className="flex gap-4 items-center">

                <span>
                  {p.status === "running" && "🟡"}
                  {p.status === "success" && "🟢"}
                  {p.status === "failed" && "🔴"}
                  {p.status === "idle" && "⚪"}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    runPipeline(p._id);
                  }}
                  className="bg-blue-500 px-2 py-1 rounded"
                >
                  Run
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;