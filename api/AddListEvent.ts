import { Events, PrismaClient } from "@prisma/client";
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
  const list = await prisma.list.findUnique({
    where: { url: validReqBody.ListURL },
  });

  if (!list) {
    return response
      .status(404)
      .send(`Couldnt find list with url ${validReqBody.ListURL}`);
  }

  await prisma.listEvent
    .create({
      data: {
        event: validReqBody.Event,
        eventData: validReqBody.Word,
        listId: list.id,
      },
    })
    .then((li) => {
      prisma.$disconnect;
      return response
        .status(201)
        .send(`Your word was added, it got id ${li.id}`);
    })
    .catch((e) => {
      prisma.$disconnect;
      console.error(e);
      return response.status(500).send(`Coldn't add word to list.`);
    });
}

class ValidatedRequestBody {
  ListURL: string;
  Word: string;
  Event: Events;
  constructor(listUrl: string, word: string, event: Events) {
    (this.ListURL = listUrl), (this.Word = word), (this.Event = event);
  }

  public static fromJson(json: Record<string, any>) {
    if (
      "listUrl" in json &&
      "word" in json &&
      "event" in json &&
      json["event"] in Events
    ) {
      return new ValidatedRequestBody(
        json["listUrl"],
        json["word"],
        json["event"]
      );
    }
  }
}
