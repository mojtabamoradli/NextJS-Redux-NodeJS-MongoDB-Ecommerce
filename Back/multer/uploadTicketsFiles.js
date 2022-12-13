import express from "express";
import cors from "cors";
import multer from "multer";

const uploadTicketsFilesByMulter = express();
uploadTicketsFilesByMulter.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "../Front/public/uploads/ticketsFiles");
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname.replace(/\s+/g, ""));
  },
});

const upload = multer({ storage: fileStorageEngine });

uploadTicketsFilesByMulter.post("/tickets/upload", upload.single('file'), (request, response) => {
  // console.log(request.file);
  // response.send(response);
});

export { uploadTicketsFilesByMulter };