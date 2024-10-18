import axios from "axios";

export const FETCH_BLOGS_REQUEST = "FETCH_BLOGS_REQUEST";
export const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";
export const FETCH_BLOGS_FAILURE = "FETCH_BLOGS_FAILURE";
export const fetchBlogs =
  (page: number, limit: number) => async (dispatch: any) => {
    dispatch({ type: FETCH_BLOGS_REQUEST });

    try {
      const apiUrl = process.env.REACT_APP_BACKENDURL;
      const response = await axios.get(
        `${apiUrl}getBlogs?page=${page}&limit=${limit}`
      );
      const likedBlogs = JSON.parse(localStorage.getItem("likedPost") || "[]");
      const blogsWithLikes = response.data.Blogs.map((blog: any) => ({
        ...blog,
        likedByUser: likedBlogs.includes(blog._id),
      }));

      dispatch({
        type: FETCH_BLOGS_SUCCESS,
        payload: {
          blogsWithLikes,
          totalPages: response.data.totalPages,
        },
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_BLOGS_FAILURE,
        payload: error.message,
      });
    }
  };
