import { sendEmail } from "@/lib/email";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { subject, phoneNumber, additionalInput } = await request.json();
  const fullMessage = `Subject: ${JSON.stringify(subject)}\nPhone Number: ${phoneNumber}\nAdditional Input: ${additionalInput}`;

  const success = await sendEmail(fullMessage);

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