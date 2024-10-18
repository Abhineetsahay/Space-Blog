import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Loader } from "../../../utils/Loaders";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { fetchBlogs } from "../../../Redux/actions/blogActions.Getter";
import toast from "react-hot-toast";
import axios from "axios";

export interface Blog {
  _id: string;
  username: string;
  title: string;
  description: string;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
}

const SeeBlogs = () => {
  const [likedPosts, setLikedPosts] = useState<string[]>(JSON.parse(localStorage.getItem("likedPost") || "[]"));
  const [limit] = useState(10); 
  const [currentPage, setCurrentPage] = useState<number>(
    () => Number(localStorage.getItem("currentPage")) || 1 
  );

  const dispatch = useDispatch<any>();
  const { blogs, totalPages, loading } = useSelector((state: RootState) => state.Bloggetter);

  useEffect(() => {
    dispatch(fetchBlogs(currentPage, limit));
    localStorage.setItem("currentPage", currentPage.toString());
  }, [dispatch, currentPage, limit]);

  const handleLike = async (blogId: string) => {
    try {
      const apiUrl = process.env.REACT_APP_BACKENDURL;
      const username = localStorage.getItem("name");
      const response = await axios.post(`${apiUrl}addRemoveLike`, {
        username,
        blogId,
      });

      if (response.data.success) {
        const updatedLikedByUser = response.data.likedByUser;

        if (updatedLikedByUser) {
          const updatedLikes = [...likedPosts, blogId];
          setLikedPosts(updatedLikes);
          localStorage.setItem("likedPost", JSON.stringify(updatedLikes));
        } else {
          const updatedLikes = likedPosts.filter((id) => id !== blogId);
          setLikedPosts(updatedLikes);
          localStorage.setItem("likedPost", JSON.stringify(updatedLikes));
        }

        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error("Failed to like/unlike the post.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">See Blogs</h1>

      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : blogs?.length ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog: Blog) => (
              <motion.div
                key={blog._id}
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
              >
                <h2 className="text-xl font-semibold mb-2 text-white">{blog.title}</h2>
                <p className="text-gray-400 mb-4">
                  {blog.description.length > 50
                    ? `${blog.description.substring(0, 50)}...`
                    : blog.description}
                </p>
                <Link to={`/dashboard/blogs/${blog._id}`} className="text-blue-500 hover:underline">
                  Read more
                </Link>

                <div className="flex justify-between items-center mt-4">
                  <motion.button
                    onClick={() => handleLike(blog._id)}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center text-gray-400 hover:text-red-500 transition"
                  >
                    {blog.likedByUser ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-gray-400" />}
                    <span className="ml-1">{blog.likes}</span>
                  </motion.button>

                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-400">
                      Author: <span className="font-medium text-white">{blog.username}</span>
                    </span>
                    <span className="text-sm text-gray-400 cursor-pointer">Comments: {blog.comments.length}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg mx-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            >
              Previous
            </button>
            <span className="text-gray-400">Page {currentPage}</span>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg mx-2"
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-400">No blogs found.</p>
        </div>
      )}
    </div>
  );
};

export default SeeBlogs;
