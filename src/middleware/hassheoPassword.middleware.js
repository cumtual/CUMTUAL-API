const bcrypt = require('bcrypt');


async function verifyPassword(loginPass, storePass, res){
  
    try{
      
         // Comparar la contraseña ingresada con el hash almacenado en la base de datos
    const isPasswordValid = await bcrypt.compare(loginPass, storePass);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });  // Respuesta enviada aquí
    }
    
    return res.status(200).json({ message: 'Login exitoso' }); 

    } catch{
        return res.status(403).json({message:'Error al utilizar la funcion'})
    }
}

 module.exports = verifyPassword;
