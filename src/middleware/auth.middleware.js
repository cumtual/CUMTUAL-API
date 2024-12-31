const jwt = require('jsonwebtoken');
const { log } = require('winston');

const authenticateToken = (requiredRoles = [] , requiredStatus = '1') => {
  return (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido.' });
      }

      req.user = user; // Asignar la información del usuario al objeto req

     // console.log(requiredRoles);

      // Verificar si el rol del usuario está permitido para acceder a la ruta
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role) ) {
        return res.status(403).json({ message: 'Acceso denegado. No tienes permisos suficientes.' });
      }
       // Verificar el estatus del usuario
       if (user.intstatus !== requiredStatus) {
        return res.status(403).json({ message: `Acceso denegado. El usuario está inactivo` });
      }

      next(); // El usuario tiene el rol adecuado, permitir el acceso
    });
  };
};

module.exports = authenticateToken;
