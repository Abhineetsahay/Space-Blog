import express from "express";
import { AddUser } from "../controllers/UserController/AddUser";
import { GetUser } from "../controllers/UserController/GetUser";


const apiRoutes=express.Router();


apiRoutes.post("/addUser",AddUser);
apiRoutes.get("/getUser",GetUser); 

export default apiRoutes;