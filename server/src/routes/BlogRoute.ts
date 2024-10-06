import express from "express";
import { GetBlog } from "../controllers/BlogContoller/GetBlog";
import { AddBlog } from "../controllers/BlogContoller/AddBlog";
import { AddRemoveLike } from "../controllers/BlogContoller/AddLike";


const BlogRoutes=express.Router();

BlogRoutes.get("/getBlogs",GetBlog);
BlogRoutes.post("/addBlog",AddBlog);
BlogRoutes.post("/addRemoveLike",AddRemoveLike);
export default BlogRoutes;