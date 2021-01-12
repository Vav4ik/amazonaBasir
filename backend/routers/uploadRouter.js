import express from "express";
import multer from "multer";
import { isAdmin, isAuth } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //where it will be stored in file directory
    cb(null, "uploads/products/");
  },
  filename(req, file, cb) {
    //give it a name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
    //accept file
    cb(null, true);
  } else {
    //ignore file and return an error
    cb(new Error("You can only upload JPEG or PNG files"), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
   fileSize: 1024 * 1024 * 5 //max size 5Mb
  }, 
  fileFilter: fileFilter 
});

uploadRouter.post(
  "/",
  isAuth,
  isAdmin,
  upload.single("productImage"),
  (req, res) => {
    //console.log(req.file);
    //see server.js for this static route - /productimages
    const imageUrl = "/productimages/" + req.file.filename;
    res.send(imageUrl);
  }
);

export default uploadRouter;
