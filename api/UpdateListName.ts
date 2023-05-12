import { PrismaClient } from "@prisma/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
export default async function handleRequest(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(400).end();
  }

  const validReqBody = ValidatedRequestBody.fromJson(request.body);
  if (!validReqBody) {
    return response
      .status(400)
      .send(`Couldnt parse json ${JSON.stringify(request.body)}`);
  }

  const prisma = new PrismaClient();

  await prisma.list
    .update({
      data: {
        publicName: validReqBody.ListName,
      },
      where: {
        url: validReqBody.ListURL,
      },
    })
    .then((li) => {
      prisma.$disconnect;
      return response
        .status(200)
        .send(JSON.stringify({ listName: validReqBody.ListName }));
    })
    .catch((e) => {
      prisma.$disconnect;
      console.error(e);
      return response.status(500).send(`Couldn't change name of list`);
    });
}

class ValidatedRequestBody {
  ListURL: string;
  ListName: string;
  constructor(listUrl: string, listName: string) {
    (this.ListURL = listUrl), (this.ListName = listName);
  }

  public static fromJson(json: Record<string, any>) {
    if ("listUrl" in json && "listName" in json) {
      return new ValidatedRequestBody(json["listUrl"], json["listName"]);
    }
  }
}
