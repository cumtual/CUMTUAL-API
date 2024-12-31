const jwt = require('jsonwebtoken');
const { log } = require('winston');

const authenticateToken = (req, res, next) => {

  
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  //console.log(token);
  
  if (token == null) {
    return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(user);
      return res.status(403).json({ message: 'Token no válido.' });
    }
    req.user = user;
    next(); 
  });
};

module.exports = authenticateToken;
