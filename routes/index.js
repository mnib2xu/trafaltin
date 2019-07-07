const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2')
require('dotenv').config()


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.SEND_MAIL_ACCOUNT,
      pass: process.env.SEND_MAIL_PASSWORD
  },
  // tls:{
  //   rejectUnauthorized: true
  // }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', );
});

router.post('/send', (req, res, next) => {

  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //       user: `${process.env.EMAIL}`, // generated ethereal user
  //       pass: `${process.env.EMAIL_PASS}`  // generated ethereal password
  //   },
  //   tls:{
  //     rejectUnauthorized:true
  //   }
  // });

  // setup email data with unicode symbols
  
  let mailOptions = {
      from: 'info@trafaltin.com', // sender address
      to: 'info@trafaltin.com', // list of receivers
      subject: 'Contact Request', // Subject line
      html: output // html body
  };


  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.redirect('/index', {msg:'Email has been sent'});
    })
})

module.exports = router;
