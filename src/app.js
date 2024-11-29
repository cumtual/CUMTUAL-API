import express, { Router } from "express";
import cors from "cors";
import emailSendRoutes from "./routes/emailSend.routes.js";
import formsSelect from "./routes/forms.routes.js";
//import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json);

app.use("/api/",emailSendRoutes);
app.use("/api/", formsSelect);


export default app;

