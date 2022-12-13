
import MelipayamakApi from 'melipayamak'
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const smsRouter = express.Router();

dotenv.config();
smsRouter.use(cors());


smsRouter.use(bodyParser.urlencoded({ extended: true }));
smsRouter.use(bodyParser.json());


smsRouter.post("/send_sms", cors(), (req, res) => {


const api = new MelipayamakApi(process.env.SMS_USER,process.env.SMS_PASS);
const sms = api.sms();

const to = `${req.body.to}`;
const from = `${req.body.from}`;
const text = `${req.body.text}`;

sms.send(to,from,text).then(res=>{
    console.log('res',res)
}).catch(err=>{
    console.log('err',err)
})


});

export { smsRouter };
