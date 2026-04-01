import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "New Pipeline", path: "/pipelines/new" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      
      <h1 className="text-2xl font-bold mb-6">⚡ InfraFlow</h1>

      {menu.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`p-2 rounded cursor-pointer mb-2 ${
            location.pathname === item.path
              ? "bg-blue-500"
              : "hover:bg-gray-700"
          }`}
        >
          {item.name}
        </div>
      ))}

      <div
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        className="p-2 mt-6 text-red-400 cursor-pointer hover:bg-gray-700 rounded"
      >
        Logout
      </div>
    </div>
  );
}

export default Sidebar;