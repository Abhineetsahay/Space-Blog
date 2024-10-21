import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../../../../utils/Loaders";

interface AddCommentProps {
  onClose: () => void;
  blogId: string | undefined;
  onCommentAdded: (newComment: any) => void;
}

export const AddComment: React.FC<AddCommentProps> = ({
  onClose,
  blogId,
  onCommentAdded,
}) => {
  const [newComment, setNewComment] = useState("");
  const [loader, setLoader] = useState(false);
  const handleAddComment = async () => {
    try {
      if (!newComment) {
        toast.error("Comment cannot be empty.");
        return;
      }
      setLoader(true);
      const commentAuthor = localStorage.getItem("name");
      const apiUrl = process.env.REACT_APP_BACKENDURL;
      const response = await axios.post(`${apiUrl}addComment`, {
        blogId,
        commentText: newComment,
        commentAuthor,
      });

      if (response.data.success) {
        onCommentAdded(response.data.comment);
        setNewComment("");
        toast.success("Comment added successfully!");
        setLoader(false);
        onClose();
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add comment.");
    }
  };

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-slate-700 p-8 rounded-lg shadow-md text-black w-10/12">
        <h3 className="text-xl font-bold mb-2 text-white">Add a Comment:</h3>
        <textarea
          className="w-full p-2 border border-blue-500 rounded"
          placeholder="Enter your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-center space-x-2">
          {loader ? (
            <div className="bg-blue-600 flex justify-center items-center w-10/12 px-4 py-2 rounded-md">
              <Loader />
              </div>
          ) : (
            <motion.button
              className="text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md"
              onClick={handleAddComment}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Comment
            </motion.button>
          )}
          <motion.button
            className="text-white bg-gray-600 hover:bg-gray-700 transition px-4 py-2 rounded-md"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </div>
    </div>
  );
};
