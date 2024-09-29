import { useState } from "react";
import { auth } from "../../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      toast.success("User Logged Out Successfully");
      navigate("/authenticate");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toProfile=()=>{
          const username=localStorage.getItem("name");
          navigate(`${username}/profile`)
  }
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Space Explorer
            </h1>
          </div>

          <div className="flex sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div className="hidden sm:flex space-x-4">
            <button
              onClick={toProfile}
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Your Profile
            </button>

            <button
              onClick={() => navigate("/dashboard/watchNews")}
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              See News
            </button>

            <button
              onClick={() => navigate("/blogs")}
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Blogs
            </button>

            <button
              onClick={handleLogOut}
              className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-gray-700">
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
          >
            Your Profile
          </button>

          <button
            onClick={() => navigate("/news")}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
          >
            See News
          </button>

          <button
            onClick={() => navigate("/blogs")}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
          >
            Blogs
          </button>

          <button
            onClick={handleLogOut}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600 bg-red-500"
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
