const express = require('express');
require('dotenv').config()
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

app.use(express.urlencoded());
app.use(express.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Mail sender service');
});

app.post('/', async (req, res) => {
    const email = req.body.email;
    console.log('email', email);
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "oAuth2",
              user: "yashsinghvi3011@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
            },
        });
      
        const mailOptions = {
            from: "Yash Singhvi <yashsinghvi3011@gmail.com>",
            to: email,
            subject: 'Test Email',
            html: `<h1>This is a testing email</h1>`
        };

        await transport.sendMail(mailOptions);

        res.status(200).send('Mail sent successfully');
    } catch(error) {
        res.status(500).send({
            message: error.message
        });
    }  
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});