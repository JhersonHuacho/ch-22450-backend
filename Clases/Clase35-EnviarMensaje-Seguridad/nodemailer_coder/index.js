const express = require('express');
const { createTransport } = require('nodemailer');

const app = express();
const TETS_EMAIL = 'btdp2wb2qtmgmnj7@ethereal.email';
const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TETS_EMAIL,
    pass: 'yEZXhGVehpM49yQ3bf'
  }
});

const mailOptions = {
  from: 'Servidor node.js',
  to: TETS_EMAIL,
  subject: 'Mail de prueba desde NodeJS',
  html: `<h1 style="color: blue;">
    Contenido de prueba desde 
    <span style="color: green;">NODEMAILER</span>
  </h1>`
}

app.post('/email-coder', async (req, res) => {
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(info);
    res.send(`Email enviado a ${TETS_EMAIL}`);
  } catch (error) {
    console.log(error);
  }
})


app.listen(3001, () => {
  console.log(`Server run port 3001`);
});