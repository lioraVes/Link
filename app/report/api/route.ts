import { sendEmailWithAttachment } from "@/lib/email";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get("image") as File | null;
  const link = formData.get("link") || "לא סופק";
  const text = (formData.get("text") as string) || "לא סופק";
  const platform = formData.get("platform") || "לא ידוע";
  const personalDetails = formData.get("personalDetails") || "לא סופקו פרטים";

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
          .box {
            background-color: #f6f6f6;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <p><strong>📢 פלטפורמה:</strong> ${platform}</p>
        <p><strong>🔗 קישור:</strong> ${link}</p>
        <p><strong>📝 תוכן ההודעה:</strong></p>
        <p>${(text as string).replace(/\n/g, "<br>")}</p>

        <p class="highlight">📌 פרטים אישיים:</p>
        <div class="box">
          <p>${(personalDetails as string).replace(/\n/g, "<br>")}</p>
        </div>
      </body>
    </html>
  `;

  const success = await sendEmailWithAttachment(fullMessage, image, "html");

  const response = {
    success,
    message: success
      ? "תודה רבה על פנייתך. נחזור אליך בהקדם."
      : "אופס! משהו השתבש. נסה שוב מאוחר יותר.",
  };

  console.log(response);

  return new Response(JSON.stringify(response), {
    status: success ? 200 : 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
