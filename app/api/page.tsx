import nodemailer, { TransportOptions } from "nodemailer";

export function getEmailTransport() {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jam.project.final@gmail.com",
      pass: "Jam123!!",
    },
  } as TransportOptions);
  return transport;
}

export async function sendEmail(msg: string) {
  const transport = getEmailTransport();
  const message = {
    from: "jam.project.final@gmail.com",
    to: "meshimaman1@gmail.com",
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
