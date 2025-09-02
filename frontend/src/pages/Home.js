
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to <span className="text-green-600">TaskManager</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl"> 
        Sign up to create tasks, set deadlines, and manage everything in one place.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
