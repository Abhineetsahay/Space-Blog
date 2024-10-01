import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";
import { Loader } from "../../../utils/Loaders";

interface Comment {
  _id: string;
  commentText: string;
  commentLikes: number;
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
}

const SeeBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSeeBlogs = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_BACKENDURL;
      const response = await axios.get(`${apiUrl}getBlogs`);
      if (response.data.success) {
        setBlogs(response.data.Blogs);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (blogId: string) => {
    try {
      const apiUrl = process.env.REACT_APP_BACKENDURL;
      const response = await axios.post(`${apiUrl}likeBlog`, { blogId });
      if (response.data.success) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId
              ? {
                  ...blog,
                  likes: blog.likedByUser ? blog.likes - 1 : blog.likes + 1,
                  likedByUser: !blog.likedByUser,
                }
              : blog
          )
        );
        // toast.success(blogs.likedByUser ? "Post unliked!" : "Post liked!");
      }
    } catch (error: any) {
      toast.error("Failed to like/unlike the post.");
    }
  };

  useEffect(() => {
    handleSeeBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">See Blogs</h1>
      {loading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-400 mb-4">{blog.description}</p>

              <div className="flex justify-between items-center">
                <motion.button
                  onClick={() => handleLike(blog._id)}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-gray-400 hover:text-red-500 transition"
                >
                  {blog.likedByUser ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart />
                  )}
                  <span className="ml-1">{blog.likes}</span>
                </motion.button>

                <button className="text-gray-400 text-sm">
                  Comments: {blog.comments.length}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="flex justify-center">
            <p className="text-gray-400">No blogs found.</p>
          </div>
        )
      )}
    </div>
  );
};

export default SeeBlogs;
