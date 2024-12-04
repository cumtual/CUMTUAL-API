const { saveLead } = require("../controllers/emailSend.controller.js");
const { Router } = require("express");


const router = Router();

router.post("/save-lead",saveLead);
//router.post("/emailSend",sendEmail);

module.exports = router;