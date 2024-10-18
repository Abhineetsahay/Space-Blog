import express from "express";
import { GetBlog, GetBlogById } from "../controllers/BlogContoller/GetBlog";
import { AddBlog } from "../controllers/BlogContoller/AddBlog";
import { AddRemoveLike } from "../controllers/BlogContoller/AddLike";


const BlogRoutes=express.Router();

BlogRoutes.get("/getBlogs",GetBlog);
BlogRoutes.get("/getBlogById/:id",GetBlogById);
BlogRoutes.post("/addBlog",AddBlog);
BlogRoutes.post("/addRemoveLike",AddRemoveLike);
export default BlogRoutes;