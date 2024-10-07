import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader } from "../../../utils/Loaders";

interface Bookmark {
  _id: string;
  title: string;
  imageUrl: string;
  summary: string;
  url: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  posts: any[];
  likesPost: any[];
  bookmarks: Bookmark[];
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const username = localStorage.getItem("name");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(
    new Set()
  );

  const fetchUser = async () => {
    if (!username) {
      setError("No username found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const url = process.env.REACT_APP_BACKENDURL;
      const response = await axios.get(`${url}/getUser?username=${username}`);
      if (response.data.success) {
        const fetchedUser: User = response.data.findUser;
        setUser(fetchedUser);

        // Initialize bookmarkedArticles from user data
        const bookmarkIds = fetchedUser.bookmarks.map((b) => b._id);
        const bookmarkSet = new Set<string>(bookmarkIds);
        setBookmarkedArticles(bookmarkSet);
        saveBookmarksToLocalStorage(bookmarkSet);
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

  const saveBookmarksToLocalStorage = (bookmarks: Set<string>) => {
    localStorage.setItem(
      "bookmarkedArticles",
      JSON.stringify(Array.from(bookmarks))
    );
  };

  const handleRemoveBookmark = async (bookmark: Bookmark) => {
    if (!username) {
      toast.error("You need to be logged in to remove bookmarks.");
      return;
    }

    const apiUrl = process.env.REACT_APP_BACKENDURL;
    const { title, imageUrl, summary, url } = bookmark;
    try {
      const response = await axios.delete(`${apiUrl}removeBookmark`, {
        data: { username, title, imageUrl: imageUrl, summary, url },
      });

      if (response.data.success) {
        const newBookmarks = new Set(bookmarkedArticles);
        newBookmarks.delete(bookmark._id);
        setBookmarkedArticles(newBookmarks);
        saveBookmarksToLocalStorage(newBookmarks);
        toast.success("Bookmark removed successfully!");
      } else {
        toast.error(response.data.message || "Failed to remove bookmark.");
      }
    } catch (error: any) {
      console.error("Error removing bookmark:", error);
      toast.error(
        error.response?.data?.message || "Failed to remove bookmark."
      );
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">Profile Page</h1>

      {loading ? (
        <Loader/>
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

          {/* User Details */}
          <div className="bg-gray-700 p-6 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-2">User Information</h3>
            <p className="text-gray-300">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <div className="flex justify-between mb-6">
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
                    <div className="flex gap-6 justify-center items-center mt-6">
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Read more →
                      </a>
                      <button
                        onClick={() => handleRemoveBookmark(bookmark)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
                        aria-label={`Remove bookmark for ${bookmark.title}`}
                      >
                        Remove Bookmark
                      </button>
                    </div>
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
