import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN:", token); // 🔥 debug

    if (token) {
      localStorage.setItem("token", token);

      // ⏳ small delay to ensure storage
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <h1>Logging you in...</h1>
    </div>
  );
}

export default AuthSuccess;