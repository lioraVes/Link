import { EMAIL_ADDRESS, EMAIL_PASSWORD } from "@/lib/config";
import nodemailer, { TransportOptions } from "nodemailer";

export function getEmailTransport() {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  } as TransportOptions);
  return transport;
}

export async function sendEmail(msg: string) {
  const transport = getEmailTransport();
  const message = {
    from: EMAIL_ADDRESS,
    to: EMAIL_ADDRESS,
    subject: "פניית פגיעה ברשת לטיפול",
    text: msg,
    html: `<p>${msg}</p>`,
  };
  // default to false and only set true if the email is sent successfully
  let success = false;
  try {
    await transport.sendMail(message);
    success = true;
  } catch (error) {
    console.log(error);
  }
  return success;
}
