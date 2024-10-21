import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-gray-900 p-8 h-screen flex justify-center items-center">
      <div className="max-w-lg text-start bg-gray-700 p-10 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-wide animate-fadeIn">
          Welcome to <span className="text-blue-500">Space Blog</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Dive deep into the mysteries of the universe through our latest articles, insights, and cosmic news.
        </p>

        <Link
          to='/authenticate'
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
        >
          Authorize Yourself
        </Link>
      </div>
    </div>
  );
};
