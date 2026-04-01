import { Github } from "lucide-react";

function Landing() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">
        ⚡ Infra<span className="text-blue-500">Flow</span>
      </h1>

      <button
        onClick={handleLogin}
        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200"
      >
        <Github size={20} />
        Continue with GitHub
      </button>
    </div>
  );
}

export default Landing;