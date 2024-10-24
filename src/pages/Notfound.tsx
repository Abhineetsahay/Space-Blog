import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-white text-center px-4">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold">
          Oops! Page not found
        </h2>
        <p className="text-lg md:text-xl text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-4 px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300 text-white font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
