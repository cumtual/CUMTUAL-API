const bcrypt = require('bcrypt');

const password = 'admin';

async function hashPassword() {
  try {
    // Generar un "salt" con un número de rondas (10 es un valor comúnmente utilizado)
    const salt = await bcrypt.genSalt(10);

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Contraseña original:', password);
    console.log('Contraseña hasheada:', hashedPassword);

    // Ahora puedes almacenar 'hashedPassword' en tu base de datos
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
  }
}

// Llamar a la función para hashear la contraseña
hashPassword();

