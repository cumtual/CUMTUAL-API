const { getConnection } = require("../database/conexion.js");
const { sendEmailClient } = require("../helpers/emailHelper.js")
 
const saveLead = async (req, res) => {

    try {
      const {
        strFullName,
        strEmail,
        intTipoServ,
        intBuisness,
        strPhone,
        strScheduleContact,
        strProjectDescription,
        language
      } = req.body;
      
      if (!strFullName || !strEmail || !strPhone || !strProjectDescription) {
        return res.status(400).json({ message: 'Campos requeridos.' });
      }
      const trimmedFullName = strFullName.trim();
      const trimmedEmail = strEmail.trim();
      const trimmedPhone = strPhone.trim();
      const trimmedScheduleContact = strScheduleContact ? strScheduleContact.trim() : '';
      const trimmedProjectDescription = strProjectDescription.trim();
  
      if (!trimmedFullName || !trimmedEmail || !trimmedPhone || !trimmedProjectDescription) {
        return res.status(400).json({ message: 'Valores requeridos.' });
      }
  
      // 3. Validate email format using regex
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ message: 'Formato invalido del correo.' });
      }
  
      // 4. Validate phone number to be numeric and of expected length
      // const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
      // if (!phoneRegex.test(trimmedPhone)) {
      //   return res.status(400).json({ message: 'Formato invalido del telefono.' });
      // }
  
      // 5. Validate that project description does not contain invalid characters (if needed)
      const projectDescRegex = /^[a-zA-Z0-9\s.,!?-]*$/; // Adjust the pattern as needed
      if (!projectDescRegex.test(trimmedProjectDescription)) {
        return res.status(400).json({ message: 'La descripcion no debe contener caraceteres especiales.' });
      }
  
      // 6. Ensure TipoServ and Buisness are integers and valid
      if (isNaN(intTipoServ) || isNaN(intBuisness)) {
        return res.status(400).json({ message: 'Dato invalido.' });
      }
  
      // Parameters to pass to the stored procedure
      const parameters = [
        trimmedFullName,
        trimmedEmail,
        intTipoServ,
        intBuisness,
        trimmedPhone,
        trimmedScheduleContact,
        trimmedProjectDescription,
      ];
  
      // Connection to the database
      const connection = await getConnection();
  
      // Execute stored procedure
      const [results] = await connection.execute(
        'CALL sp_tbLeads_Save(?, ?, ?, ?, ?, ?, ?)',
        parameters
      );
  
      // Send validation email
      await sendEmailClient(trimmedEmail, trimmedFullName, language);
      // await sendEmailCumtual(trimmedEmail, trimmedEmail, trimmedProjectDescription, trimmedPhone);
      return res.status(200).json({ message: 'Lead saved successfully' });
  
    } catch (error) {
      console.log('Error in saving lead:', error);
      return res.status(500).json({ message: 'An error occurred while saving the lead' });
    }
  };

  module.exports = {saveLead}