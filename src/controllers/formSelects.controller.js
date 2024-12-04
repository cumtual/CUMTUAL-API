const { getConnection } = require("../database/conexion.js");

const getServiceType = async (req,res) =>{
    try{
        const connection = await getConnection();

        const [results] = await connection.execute('CALL sp_tbServiceType_List');

        console.log('These are services type',results[0 ]);

        return res.status(200).json({ message: 'Services Type Done' });

    }catch(error){
        console.error('Error executing query:', error);
        
        // Send error response if something goes wrong
        return res.status(500).json({ message: 'Error retrieving service types', error: error.message });

    }
}
const getBuissnes= async (req,res) =>{
    try{
        const connection = await getConnection();

        const [results] = await connection.execute('CALL sp_tbBuissnes_List');

        console.log('These are buissnes type',results[0 ]);

        return res.status(200).json({ message: 'Buissnes Type Done' });

    }catch(error){
        console.error('Error executing query:', error);
        
        // Send error response if something goes wrong
        return res.status(500).json({ message: 'Error retrieving buissnes types', error: error.message });

    }
}

module.exports = {
    getServiceType, 
    getBuissnes
}
