import express from "express";
import { GetBlog } from "../controllers/BlogContoller/GetBlog";
import { AddBlog } from "../controllers/BlogContoller/AddBlog";


const BlogRoutes=express.Router();

BlogRoutes.get("/getBlogs",GetBlog);
BlogRoutes.post("/addBlog",AddBlog);

export default BlogRoutes;