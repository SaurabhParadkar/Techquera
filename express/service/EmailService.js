const nodemailer = require('nodemailer');

function sendVerifyMail(name,email,otp)
{   
    var message = "<html><body><h1>Hello User !</h1><hr> &nbsp;&nbsp; Welcome in TechQuera , please verify your account with this link : <br><br> LINK .</body></html>";

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'justsample4mail@gmail.com',
        pass: 'samplemail@123'
      }
    });
    
    var mailOptions = {
      from: 'justsample4mail@gmail.com',
      to: email,
      subject: 'TechQuera Verification Mail',
      html: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}