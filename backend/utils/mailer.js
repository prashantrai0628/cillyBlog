import nodemailer from "nodemailer";

// export const sendMail = async (to, subject, message) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // or another provider
//       auth: {
//         user: process.env.EMAIL, // Ensure this correctly references your EMAIL variable
//         pass: process.env.EMAIL_PASSWORD, // Ensure this correctly references your EMAIL_PASSWORD variable
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL, // Sender's email address
//       to: to, // Recipient's email address
//       subject: subject,
//       text: message,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully!");
//   } catch (error) {
//     console.error("Failed to send email:", error.message);
//     throw error; // Rethrow the error so it can be caught elsewhere
//   }
// };


const sendMail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,  // your email here
        pass: process.env.EMAIL_PASSWORD,  // your app-specific password here
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error.message);
    throw error; // To ensure it fails gracefully
  }
};

export { sendMail };
