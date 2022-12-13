import express from "express";
import cors from "cors";
import multer from "multer";

const uploadProductsImagesByMulter = express();
uploadProductsImagesByMulter.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "../Front/public/uploads/productsImages");
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname.replace(/\s+/g, ""));
  },
});

const upload = multer({ storage: fileStorageEngine });

uploadProductsImagesByMulter.post("/products/upload", upload.array("file", 3), (request, response) => {
  // console.log(request.file);
  // response.send(response);
});

export { uploadProductsImagesByMulter };
