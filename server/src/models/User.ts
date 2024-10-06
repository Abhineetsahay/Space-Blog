import mongoose, { Schema, Types, model } from "mongoose";

const CommentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: false,
    },
    commentLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BookmarkSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
      required: false,
    },
    url: { 
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const BlogSchema = new Schema(
  {
    username:{
      type:String,
      required:true
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    posts: [BlogSchema],
    likesPost: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    bookmarks: [BookmarkSchema],
  },
  {
    timestamps: true,
  }
);
export const User = model("User", UserSchema);
export const Blog=model("Blog",BlogSchema);