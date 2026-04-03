import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function NewPipeline() {
  const [form, setForm] = useState({
    name: "",
    repoUrl: "",
    branch: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post("http://infraflow-backend.onrender.com/pipelines", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/dashboard");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-950 text-white p-6">
        <h1 className="text-3xl mb-6">Create Pipeline</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Project Name"
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Repo URL"
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
          />

          <input
            placeholder="Branch"
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
          />

          <button className="bg-blue-500 px-4 py-2 rounded">
            Create
          </button>

        </form>
      </div>
    </div>
  );
}

export default NewPipeline;