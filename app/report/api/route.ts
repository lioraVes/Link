import { sendEmailWithAttachment } from "@/lib/email";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get("image");
  const link = formData.get("link");
  const text = formData.get("text");
  const personalDetails = formData.get("personalDetails");

  const fullMessage = `Link: ${link}\n\nText: ${text}\n\nPersonal Details: ${personalDetails}`;

  const success = await sendEmailWithAttachment(fullMessage, image as File | null);

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