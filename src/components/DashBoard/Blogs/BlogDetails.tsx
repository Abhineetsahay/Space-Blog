import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../../../utils/Loaders";
import { Blog } from "./SeeBlogs";
import { motion } from "framer-motion";
import { AddComment } from "./pop/AddComment";

interface Comment {
  _id: string;
  commentAuthor: string;
  commentText: string;
  commentLikes: number;
}

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false); 
  const [showAddCommentPopup, setShowAddCommentPopup] = useState(false); 

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_BACKENDURL;
      const response = await axios.get(`${apiUrl}getBlogById/${id}`);
      
      if (response.data.success) {
        setBlog(response.data.Blog);
        setComments(response.data.Blog?.comments || []);
      }
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch blog details.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : blog ? (
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-white">{blog.title}</h1>

          <div className="max-w-full mb-4">
            <strong className="text-lg">Description:</strong>
            <p className="text-gray-400 mt-2 text-lg leading-relaxed break-words">
              {blog.description}
            </p>
          </div>

          <div className="mt-6 text-gray-400">
            <strong>Author: </strong>
            <span className="font-medium text-white">{blog.username}</span>
          </div>

          <div className="mt-2 text-gray-400">
            <strong>Total Likes: </strong>
            <span className="font-medium text-white">{blog.likes}</span>
          </div>

          <div className="mt-4">
            <motion.button
              className="text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md"
              onClick={() => setShowComments(!showComments)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showComments ? "Hide Comments" : "Show Comments"}
            </motion.button>
          </div>

          {showComments && (
            <div className="mt-4">
              {comments.length > 0 ? (
                comments
                  .filter((comment) => comment && comment._id) 
                  .map((comment) => (
                    <div key={comment._id} className="mt-4">
                      <p>
                        <strong>{comment.commentAuthor || "Anonymous"}</strong>: {comment.commentText || "No comment text."}
                      </p>
                      <p className="text-sm text-gray-500">Likes: {comment.commentLikes}</p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-400">No comments available.</p>
              )}
            </div>
          )}

          
          <motion.button
            className="mt-6 text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md"
            onClick={() => setShowAddCommentPopup(true)} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Comment
          </motion.button>

          {showAddCommentPopup && (
            <AddComment
              onClose={() => setShowAddCommentPopup(false)} 
              blogId={id} 
              onCommentAdded={(newComment) => setComments([...comments, newComment])}
            />
          )}

          <motion.div
            className="mt-6 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/dashboard/blogs"
              className="text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md"
            >
              Back to Blog Page
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <p className="text-gray-400">Blog not found.</p>
      )}
    </div>
  );
};

export default BlogDetails;
