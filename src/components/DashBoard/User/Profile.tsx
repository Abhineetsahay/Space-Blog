import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface User {
  _id: string;
  username: string;
  email: string;
  posts: any[];
  likesPost: any[];
  bookmarks: any[];
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const username = localStorage.getItem("name");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUser = async () => {
    if (!username) {
      setError("No username found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const url = process.env.REACT_APP_BACKENDURL;
      const response = await axios.get(`${url}getUser?username=${username}`);
      if (response.data.success) {
        setUser(response.data.findUser);
      } else {
        setError(response.data.message || "Failed to fetch user data.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching user data."
      );
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Profile Page</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <div className="bg-red-600 p-4 rounded-lg shadow-md">
          <p className="text-white">{error}</p>
        </div>
      ) : user ? (
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-700 rounded-full mb-4 flex items-center justify-center text-3xl">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-semibold">
              Welcome, {user.username}!
            </h2>
            <p className="text-gray-400">
              Member since {formatDate(user.createdAt)}
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-2">User Information</h3>
            <p className="text-gray-300">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              onClick={() => toast("Edit Profile functionality coming soon!")}
            >
              Edit Profile
            </button>
          </div>
          <div className="pt-5">
            <h3 className="text-2xl font-semibold mb-4">Your Bookmarks</h3>

            {user.bookmarks.length === 0 ? (
              <p className="text-gray-400">You have no bookmarks yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.bookmarks.map((bookmark) => (
                  <motion.div
                    key={bookmark._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <img
                        src={bookmark.imageUrl}
                        alt={bookmark.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-2">
                        {bookmark.title}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {bookmark.summary?.substring(0, 100)}...
                      </p>
                    </div>

                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline mt-4"
                    >
                      Read more →
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Profile;
