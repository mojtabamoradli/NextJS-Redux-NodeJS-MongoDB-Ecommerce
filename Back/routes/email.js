import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const emailRouter = express.Router();

dotenv.config();
emailRouter.use(cors());


emailRouter.use(bodyParser.urlencoded({ extended: true }));
emailRouter.use(bodyParser.json());

emailRouter.post("/send_mail", cors(), async (req, res) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: `${req.body.from}`,
    to: `${req.body.to}`,
    subject: `${req.body.subject}`,
    html: `${req.body.text}`,
  });
});

export { emailRouter };
