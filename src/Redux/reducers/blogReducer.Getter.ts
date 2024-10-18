
import {
    FETCH_BLOGS_REQUEST,
    FETCH_BLOGS_SUCCESS,
    FETCH_BLOGS_FAILURE,
  } from "../actions/blogActions.Getter";
  
  interface BlogState {
    blogs: [];
    totalPages:Number;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: BlogState = {
    blogs: [],
    totalPages:0,
    loading: false,
    error: null,
  };
  
  export const blogReducerGetter = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_BLOGS_REQUEST:
        
        return {
          ...state, 
          loading: true,
          error: null,
        };
      case FETCH_BLOGS_SUCCESS:
        
        return {
          ...state,
          blogs: action.payload.blogsWithLikes,
          totalPages:action.payload.totalPages,
          loading: false,
        };
      case FETCH_BLOGS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  