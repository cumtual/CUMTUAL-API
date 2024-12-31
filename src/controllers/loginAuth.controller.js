const  { getConnection } = require("../database/conexion");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyPassword = require('../middleware/hassheoPassword.middleware.js')
const bcrypt = require('bcrypt');
const { JWT_SECRET } =  process.env;


const loginAuth = async (req,res) =>{

    try{
        
        const {
            strUserName,
            strPassword
        } = req.body

       // console.log(req.body);

    if(strUserName == '' && strPassword == '')
    {
     return res.status(400).json({message:'Usuario y Contraseña requeridas'});
    }

    const trimUserame = strUserName.trim();
    const trimPassword = strPassword.trim();
    
    const spParameters =[
        trimUserame // ,
       // trimPassword ,
    ]    

    const connection = await getConnection();
    const [result] = await connection.execute(
        'CALL sp_tbCumtualUser_Auth ( ?  )',spParameters
    )   
    const storedHash = result[0][0].strPassword;  // El hash almacenado en la base de datos

    await verifyPassword(trimPassword,storedHash,res);

    if (result[0][0].mensaje != undefined) {       
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }    

    const user = {
        username: result[0][0].strUserName,           
        role: result[0][0].intRol,       
    };

  

   // console.log(user);

 
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1m' });
    res.json({ token });

   // return res.redirect('/');
    

    }catch (error) {
       // console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


module.exports = { loginAuth };