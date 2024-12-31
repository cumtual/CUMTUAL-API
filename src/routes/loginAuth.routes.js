const { Router } = require("express");
const {loginAuth} = require ('../controllers/loginAuth.controller.js');
const  authenticateToken  = require ('../middleware/auth.middleware.js');


const router = Router();

router.post('/login-SingIn', loginAuth);

router.post('/dashboard', authenticateToken);

module.exports = router;

