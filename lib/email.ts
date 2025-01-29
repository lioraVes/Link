import { EMAIL_ADDRESS, EMAIL_PASSWORD } from "@/lib/config";
import nodemailer, { TransportOptions } from "nodemailer";

export function getEmailTransport() {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:  EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
    // tls: {
    //   rejectUnauthorized: false, // Add this line to ignore self-signed certificates
    // },
  } as TransportOptions);
  return transport;
}

export async function sendEmail(msg: string, format: "text" | "html" = "text") {
  const transport = getEmailTransport();
  const message = {
    from: EMAIL_ADDRESS,
    to: EMAIL_ADDRESS,
    subject: "פניית פגיעה ברשת לטיפול",
    text: format === "text" ? msg : "", // Plain text fallback
    html: format === "html" ? msg : "", // HTML content
  };
  let success = false;
  try {
    await transport.sendMail(message);
    success = true;
  } catch (error) {
    console.log(error);
  }
  return success;
}

export async function sendEmailWithAttachment(
  content: string,
  attachment: File | null,
  format: "text" | "html" = "text"
) {
  const transport = getEmailTransport();
  const message = {
    from: EMAIL_ADDRESS,
    to: EMAIL_ADDRESS,
    subject: "פניית פגיעה ברשת לטיפול",
    text: format === "text" ? content : "", // Plain text fallback
    html: format === "html" ? content : "", // HTML content
    attachments: attachment
      ? [
          {
            filename: attachment.name,
            content: Buffer.from(await attachment.arrayBuffer()),
          },
        ]
      : [],
  };

  let success = false;
  try {
    await transport.sendMail(message);
    success = true;
  } catch (error) {
    console.error("Error sending email:", error);
  }
  return success;
}
