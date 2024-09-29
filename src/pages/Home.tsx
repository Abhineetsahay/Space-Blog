import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-transparent p-8 rounded-lg shadow-lg ">
      <h1 className="text-4xl mb-4">Welcome to Space Blog</h1>
      <p className="text-lg mb-6">Explore the universe through our articles and news.</p>
      
      <Link
        to='/authenticate'
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Authorise Yourself
      </Link>
    </div>
  );
};
