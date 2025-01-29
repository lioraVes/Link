import { sendEmail } from "@/lib/email";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { phone, message } = await request.json();

  const fullMessage = `
    <html>
      <body>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      </body>
    </html>
  `;
  const success = await sendEmail(fullMessage, "html").catch((err) => {
    console.error("Email sending failed:", err);
    return false;
  });

  const response = {
    success,
    message: success
      ? "Thank you for your message. We will get back to you soon."
      : "Oops. Something went wrong.",
  };

  console.log(response);

  return new Response(JSON.stringify(response), {
    status: success ? 200 : 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
