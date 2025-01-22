import { ContactFormResponse } from "@/app/report/types";

export async function postFormData(data: Record<string, any>, url: string): Promise<ContactFormResponse> {
  const formData = new FormData();

  for (const key in data) {
    if (key === "personalDetails" && typeof data[key] === "object") {
      // Convert personalDetails object to a readable string format
      const personalDetails = data[key];
      const formattedPersonalDetails = `
        First Name: ${personalDetails.firstName || "N/A"}
        Last Name: ${personalDetails.lastName || "N/A"}
        Phone: ${personalDetails.phone || "N/A"}
        Email: ${personalDetails.email || "N/A"}
      `;
      formData.append(key, formattedPersonalDetails.trim());
    } else {
      formData.append(key, data[key]);
    }
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit the form");
  }

  return response.json();
}
