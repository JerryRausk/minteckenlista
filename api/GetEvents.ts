import { PrismaClient } from "@prisma/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handleRequest(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "GET") {
    return response.status(400).end();
  }
  const prisma = new PrismaClient();
  const listUrl = request.query["listUrl"];
  if (typeof listUrl !== "string") {
    return response.status(400).send("listUrl needs to be a single string.");
  }
  await prisma.listEvent
    .findMany({
      where: {
        list: {
          url: listUrl,
        },
      },
    })
    .then((l) => {
      prisma.$disconnect;
      return response.status(200).send(l);
    })
    .catch((e) => {
      prisma.$disconnect;
      console.error(e);
      return response.status(500).send(`Coldn't fetch events.`);
    });
}
