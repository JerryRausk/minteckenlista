import type { VercelRequest, VercelResponse } from "@vercel/node";

const handleRequest = async (
  request: VercelRequest,
  response: VercelResponse
) => {
  console.log(request.method);
  response.status(200).send("Hello there");
};

export default handleRequest;
