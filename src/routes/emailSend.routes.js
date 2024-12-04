import { saveLead } from "../controllers/emailSend.controller.js";
import { Router } from "express";


const router = Router();

router.post("/save-lead",saveLead);
//router.post("/emailSend",sendEmail);

export default router;