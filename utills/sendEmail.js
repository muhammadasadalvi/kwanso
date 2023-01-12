const nodemailer = require('nodemailer');
const {logger} = require('./logger');

const sendEmail = async ({ receiver, message }) => {
    try {
        logger().info(`sending email to ${receiver}`)
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'mr.asadalvi@gmail.com',
        //         pass: 'ybvzlricxgbvuvug'
        //     }
        // });

        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, 
          auth: {
            user: "mr.asadalvi@gmail.com", 
            pass: "ybvzlricxgbvuvug",
          },
        });

        let info = await transporter.sendMail({
            from: `mr.asadalvi@gmail.com`,
            to: `${receiver}`,
            subject: "Welcome!",
            // text: `${message}`,
            html: `<body>
            <h1>Welcome to Rosptom Solutions.</h1>
            <p>Please use the below password to login.</p>
            <p>Password: <strong>${message}</strong></p></body>`,
        });
        logger().info(`${JSON.stringify(info)}`);
    } catch (error) {
        logger().info(`Error while sending email ${error}`);
        throw new Error('Error whhile sending email');
    }
}

module.exports={
    sendEmail
}

