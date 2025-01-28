import { sendEmailWithAttachment } from "@/lib/email";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get("image") as File | null;
  const link = formData.get("link") || "N/A";
  const text = formData.get("text") || "N/A";
  const platform = formData.get("platform") || "N/A";
  const personalDetails = formData.get("personalDetails") || "N/A";

  const fullMessage = `
    <html>
      <body>
        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>Link:</strong> ${link}</p>
        <p><strong>Text:</strong><br>${text}</p>
        <p><strong>Personal Details:</strong><br>
          ${(personalDetails as string).replace(/\n/g, "<br>")}
        </p>
      </body>
    </html>
  `;

  const success = await sendEmailWithAttachment(fullMessage, image, "html");

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
