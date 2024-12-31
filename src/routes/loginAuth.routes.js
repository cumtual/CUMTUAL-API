const { Router } = require("express");
const {loginAuth} = require ('../controllers/loginAuth.controller.js');
const  authenticateToken  = require ('../middleware/auth.middleware.js');


const router = Router();

router.post('/login', loginAuth);

module.exports = router;

