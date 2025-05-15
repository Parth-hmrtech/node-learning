const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
}
});
let mailOptions = {
    from: 'pk.hmrtech@gmail.com',
    to: 'pk.hmrtech@gmail.com',            
    subject: 'Hello from Node.js',
    text: 'This is text sent using Node.js and Nodemailer.',
    html: '<b>This text is bold, sent using nodemailer package and Node.js</b>'
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

