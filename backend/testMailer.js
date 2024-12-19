// Import your sendMail function
import { sendMail } from "./utils/mailer.js"; // Adjust the path if needed

// Test the sendMail function
(async () => {
  try {
    // Replace with your email address
    const recipient = "studyprash@gmail.com"; 
    const subject = "Test Email";
    const message = "This is a test email sent from my MERN project.";
    
    // Attempt to send the email
    await sendMail(recipient, subject, message);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
})();
