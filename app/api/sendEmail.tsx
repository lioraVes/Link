// @ts-nocheck
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { additionalInput, selectedRating } = req.body;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email service (e.g., Gmail, Outlook)
      auth: {
        user: "meshimaman1@gmail.com", // Replace with your email
        pass: "", // Replace with your email password (use an app password if Gmail)
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: "meshimaman1@gmail.com", // Sender address
        to: "meshi.maman@mail.huji.ac.il", // Replace with the recipient email
        subject: "User Report", // Email subject
        text: `Report received:
        Phone number: ${selectedRating}
        Additional Input: ${additionalInput}`,
      });

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
