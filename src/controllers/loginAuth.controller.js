const  { getConnection } = require("../database/conexion");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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

     const isPasswordValid = await bcrypt.compare(trimPassword, storedHash);
    
        if (!isPasswordValid) {
       
          return res.status(401).json({ message: 'Contraseña incorrecta' });
          // Respuesta enviada, el flujo se detiene aquí
        }

    if (result[0][0].mensaje != undefined) {       
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }    

    const user = {
        username: result[0][0].strUserName,           
        role: result[0][0].intRol,
        intstatus: result[0][0].intStatus       
    };

  

   // console.log(user);

 
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1m' });
    res.json({message:'Token Generado', token });

    //res.redirect('/login/dashboard');
    

    }catch (error) {
       // console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


module.exports = { loginAuth };