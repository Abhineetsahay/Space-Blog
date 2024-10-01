import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const AddBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const username=localStorage.getItem("name");
  const handleAddBlog = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_BACKENDURL;
      const response = await axios.post(`${apiUrl}addBlog`, {
        username,
        title,
        description,
      });

      if (response.data.success) {
        toast.success("Blog added successfully!");
        setTitle("");
        setDescription("");
      } else {
        toast.error("Failed to add blog.");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error occurred while adding blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Add a New Blog</h1>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div>
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter blog description"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors duration-300"
            onClick={handleAddBlog}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Blog"}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddBlog;
