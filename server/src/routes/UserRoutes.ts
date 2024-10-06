import express from "express";
import { AddUser } from "../controllers/UserController/AddUser";
import { GetUser } from "../controllers/UserController/GetUser";
import { GetUserViaLogin } from "../controllers/UserController/Login";


const apiRoutes=express.Router();


apiRoutes.post("/addUser",AddUser);
apiRoutes.get("/getUser",GetUser); 
apiRoutes.get("/getUserViaLogin",GetUserViaLogin);

export default apiRoutes;