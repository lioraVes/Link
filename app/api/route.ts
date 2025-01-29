import { sendEmail } from "@/lib/email";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { phone, message } = await request.json();

  const fullMessage = `
  <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <style>
        div {
          direction: rtl;
          text-align: right;
          font-family: Arial, sans-serif;
        }
        p {
          margin: 10px 0;
        }
        .highlight {
          font-weight: bold;
          color: #F38F56;
        }
        .steps {
          background-color: #f6f6f6;
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <p><strong>מספר פלאפון:</strong> ${phone}</p>
      <p><strong>פירוט:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>

      <p class="highlight">מסלול שהמשתמש עבר:</p>
      <div class="steps">
        <p>פישינג</p>
        <p>העביר פרטים</p>
        <p>פריצה למחשב</p>
        <p>עבר מדריך פריצה למחשב</p>
        <p>עבר מדריך פייפאל</p>
      </div>
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
