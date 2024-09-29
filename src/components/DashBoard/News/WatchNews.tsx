import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const WatchNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<number>>(new Set()); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  const fetchNews = async (page: number) => {
    const offset = (page - 1) * limit;
    try {
      const response = await axios.get(
        `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&offset=${offset}`
      );
      setNews(response.data.results);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(page);
    loadBookmarkedArticles();
  }, [page]);

  const loadBookmarkedArticles = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
    setBookmarkedArticles(new Set(bookmarks)); 
  };

  const saveBookmarksToLocalStorage = (bookmarks: Set<number>) => {
    localStorage.setItem("bookmarkedArticles", JSON.stringify(Array.from(bookmarks)));
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddBookmark = async (article: any) => {
    const { title, image_url, summary, url, id } = article;
    const username = localStorage.getItem("name");
    const apiUrl = process.env.REACT_APP_BACKENDURL;

    if (bookmarkedArticles.has(id)) {
      try {
        const response = await axios.delete(`${apiUrl}removeBookmark`, {
          data: { username, title, imageUrl: image_url, summary, url },
        });
        if (response.data.success) {
          const newBookmarks = new Set(bookmarkedArticles);
          newBookmarks.delete(id); 
          setBookmarkedArticles(newBookmarks);
          saveBookmarksToLocalStorage(newBookmarks); 
          toast.success("Bookmark removed successfully!");
        }
      } catch (error) {
        console.error("Error removing bookmark:", error);
        toast.error("Failed to remove bookmark.");
      }
    } else {
      try {
        const response = await axios.put(`${apiUrl}addBookmark`, {
          username,
          title,
          imageUrl: image_url,
          summary,
          url,
        });
        if (response.data.success) {
          const newBookmarks = new Set(bookmarkedArticles).add(id); 
          setBookmarkedArticles(newBookmarks);
          saveBookmarksToLocalStorage(newBookmarks); 
          toast.success("Bookmark added successfully!");
        }
      } catch (error) {
        console.error("Error adding bookmark:", error);
        toast.error("Failed to add bookmark.");
      }
    }
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Latest Space News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length === 0 ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          news.map((article) => (
            <motion.div
              key={article.id}
              className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-400 mb-2">
                  Published on: {formatDate(article.published_at)}
                </p>
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-300 mb-4 flex-grow">
                  {article.summary}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Read more →
                </a>
                <button
                  onClick={() => handleAddBookmark(article)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-200"
                >
                  {bookmarkedArticles.has(article.id)
                    ? "Remove Bookmark"
                    : "Add to Bookmark"}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            page === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            page === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      <p className="text-center mt-4 text-gray-400">
        Page {page} of {totalPages}
      </p>
    </div>
  );
};

export default WatchNews;
