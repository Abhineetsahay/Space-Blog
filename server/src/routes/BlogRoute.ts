import express from "express";
import { GetBlog, GetBlogById } from "../controllers/BlogContoller/GetBlog";
import { AddBlog } from "../controllers/BlogContoller/AddBlog";
import { AddRemoveLike } from "../controllers/BlogContoller/AddLike";
import { AddComment } from "../controllers/BlogContoller/AddComment";


const BlogRoutes=express.Router();

BlogRoutes.get("/getBlogs",GetBlog);
BlogRoutes.get("/getBlogById/:id",GetBlogById);
BlogRoutes.post("/addBlog",AddBlog);
BlogRoutes.post("/addRemoveLike",AddRemoveLike);
BlogRoutes.post("/addComment",AddComment);
export default BlogRoutes;