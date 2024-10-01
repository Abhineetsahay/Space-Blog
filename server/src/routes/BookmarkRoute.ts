import express from "express";
import { AddbookMark } from "../controllers/NewsController/AddbookMark";
import { RemoveBookmark } from "../controllers/NewsController/RemoveBookMark";


const BookmarkRoutes=express.Router();
 
BookmarkRoutes.put("/addBookmark",AddbookMark);
BookmarkRoutes.delete("/removeBookmark",RemoveBookmark);
export default BookmarkRoutes;