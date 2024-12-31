import { ContactFormResponse } from "@/app/report/types";

export async function postFormData(data: Record<string, any>, url: string): Promise<ContactFormResponse> {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return response.json();
}