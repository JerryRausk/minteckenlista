import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  console.log("Hello??????");
  return response.status(200).json({ Yo: "Im here" });
}
