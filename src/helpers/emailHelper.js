const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_MARKETING,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Función para enviar un correo
async function sendEmailClient(email, name, language) {
  if(language === 'es'){
    try {
      await transport.sendMail({
        from: '"Cumtual - Elevamos tu idea" <marketing@cumtual.com>',
        to: email,
        subject: "Información sobre tu proyecto.",
        text: "Gracias por enviar tu información, nos estaremos contactanto en cuanto se revise la información.",
        html: `
              <p style="text-align: center; font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 20px;">
                 Hola <strong style="color: #0066cc;">${name}</strong>,
              </p>
              <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 15px;">
                Gracias por contactarnos. Estamos felices de ayudarte.
              </p>
              <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 20px;">
                Tu información está siendo revisada y nos pondremos en contacto contigo pronto.
              </p>
              <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 20px;">
                Si tú no creaste esta solicitud, puedes ignorar este mensaje.
              </p>
              <p style="text-align: center; margin-top: 20px; background-color: #191A1E; padding: 16px;">
                <a href="https://cumtual.com/" target="_blank" style="text-decoration: none;">
                  <img src="https://cumtual.com/logocumtual-23.png" alt="logo cumtual" style="max-width: 250px; height: auto; border: 0; display: inline-block;"/>
                </a>
              </p>
              <p style="font-family: Arial, sans-serif; font-size: 14px; color: #777777; text-align: center; margin-top: 20px;">
                Este es un mensaje automático, por favor no respondas.
              </p>
            `,
      });
      return "Email has been sended";
    } catch (error) {
      console.error("Error to send email.", error);
    }
  }
  try {
    await transport.sendMail({
      from: '"Cumtual - Elevamos tu idea" <marketing@cumtual.com>',
      to: email,
      subject: "Information about your project.",
      text: "Thank you for submitting your information, we will contact you as soon as it is reviewed.",
      html: `
            <p style="text-align: center; font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 20px;">
               Hi <strong style="color: #0066cc;">${name}</strong>,
            </p>
            <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 15px;">
              Thank you for contacting us. We are happy to assist you.
            </p>
            <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 20px;">
              Your information is being reviewed, and we will contact you soon.
            </p>
            <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 20px;">
              If you did not create this request, you can ignore this message.
            </p>
            <p style="text-align: center; margin-top: 20px; background-color: #191A1E; padding: 16px;">
              <a href="https://cumtual.com/" target="_blank" style="text-decoration: none;">
                <img src="https://cumtual.com/logocumtual-23.png" alt="logo cumtual" style="max-width: 250px; height: auto; border: 0; display: inline-block;"/>
              </a>
            </p>
            <p style="font-family: Arial, sans-serif; font-size: 14px; color: #777777; text-align: center; margin-top: 20px;">
              This is an automatic message, please do not reply.
            </p>
          `,
    });
    return "Email has been sended";
  } catch (error) {
    console.error("Error to send email.", error);
  }
}

module.exports = {sendEmailClient}

// export  async function sendEmailCumtual(email, name,strProjectDescription,phone) {

//      try {
//        await transport.sendMail({
//          from: '"CUMTUAL - Administrador de Proyectos" <marketing@cumtual.com>',
//          to: "marketing@cumtual.com",
//          subject: 'Información sobre el proyecto.',
//          text: 'Ha llegado un nuevo prospecto de proyecto',
//          html: `
//            <p>Prospecto: ${name},</p>
//            <p>Email: ${email}</p>
//            <p>Telefono: ${phone}</p>
//            <p>Descripcion del proyecto: ${strProjectDescription}</p>
//             <p><a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/76tWWTJf/cumtual.jpg' border='0' alt='cumtual'/></a></p>
//          `
//        });
//        console.log('Has been sent succesfully. .');
//      } catch (error) {
//        console.error('Error to send email.', error);
//      }
//    }
