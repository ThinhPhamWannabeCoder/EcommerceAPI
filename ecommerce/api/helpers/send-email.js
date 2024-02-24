const nodemailer = require('nodemailer')

module.exports = {


  friendlyName: 'Send email',


  description: '',


  inputs: {
    email:{
      type: 'string',
      require: true
    },
    confirmLink:{
      type: 'string',
      require: true
    },
    header:{
      type: 'string',
      require: true,
    },
    message:{
      type: 'string',
      require: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const {email, confirmLink, header, message} = inputs
    // Option: 
    // If(option === 'email veri) else if(option === 'password)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Remember to deleate this before commit
        user: sails.config.userEmail,
        pass: sails.config.appPassword,
        // user: 'thinhbinhthuong@gmail.com',
        // pass: 'hyawijqblpqbtjvf',
      },  
    });
    const mailOptions = {
      from: {
          name: 'ThinhEcommerce',
          address: sails.config.userEmail
      }, // sender address
      to: email, // list of receivers
      subject: `[ThinhEcommerce] ${header}`, // Subject line
      html: ` <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                  margin: 0;
                  padding: 0;
                  text-align: center;
              }
      
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  border: 1px solid #ddd; 
              }
      
              h1 {
                  color: #007BFF;
              }
      
              p {
                  margin-bottom: 20px;
              }
      
              a {
                  display: inline-block;
                  padding: 10px 20px;
                  color: #007BFF; /* Text color 
                  background-color: #fff;
                  border: 1px solid #007BFF; 
                  text-decoration: none;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
      
          <div class="container">
              <h1>${header}</h1>
              <p>${message}</p>
              <a href=${confirmLink} target="_blank">Verify Email</a>
          </div>
      
      </body>
      </html>
      
      `, // html body
      // <a href="http://localhost:1337/api/v1/auth/login" target="_blank">Verify Email</a>

    }
    try{
      await transporter.sendMail(mailOptions)  
      sails.log.info(`A verification email has been sent to ${email}`) 
    }
    catch(err){
      sails.log.error(`Theres some thing wrong at SendEmail \n ${err}`)
    }
  }


};

