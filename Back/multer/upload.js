
import express from "express";
import cors from "cors";
import multer from "multer";

const uploadByMulter = express()
uploadByMulter.use(cors());


const fileStorageEngine = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, "../Front/public/uploads")
    },
    filename: (request, file, callback) => {
      callback(null, file.originalname.replace(/\s+/g, ''))
    }
  })
  
  const upload = multer({storage: fileStorageEngine})
  
  uploadByMulter.post("/upload", upload.single('file'), (request, response) => {
    console.log(request.file)
    response.send("Uploaded.")
  })

  

  export { uploadByMulter };
