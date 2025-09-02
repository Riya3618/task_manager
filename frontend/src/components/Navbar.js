import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();


  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <span>Task Manager</span>
      <h1 className="text-2xl font-bold text-green-400">
        TaskManager
      </h1>

      {/* Nav Links */}
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="hover:text-green-400">
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/dashboard" className="hover:text-green-400">
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-green-500 px-4 py-1 rounded-lg hover:bg-green-600 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-green-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-400">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
