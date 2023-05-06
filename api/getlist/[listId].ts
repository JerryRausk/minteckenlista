import { PrismaClient } from "@prisma/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handleRequest(
  request: VercelRequest,
  response: VercelResponse
) {
  // Validate
  const req = await validateRequest(request);
  if (req instanceof InvalidRequest) {
    return response.status(req.ErrorCode).send(req.ErrorMessage);
  }

  // Perform
  const list = await findList(req.ListId);

  // Return
  if (!list) {
    return response.status(404).send(`List with id ${req.ListId} not found.`);
  }

  return response.status(200).send(list);
}

async function findList(listId: string) {
  const prisma = new PrismaClient();

  const list = prisma.sharedlists
    .findUnique({
      where: {
        id: listId,
      },
    })
    .catch(async (e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return list;
}
async function validateRequest(
  req: VercelRequest
): Promise<ValidGetRequest | InvalidRequest> {
  if (req.method === "GET") {
    const { listId } = req.query;

    if (Array.isArray(listId)) {
      return new InvalidRequest(400, "listId should not be a list.");
    }

    return new ValidGetRequest(listId);
  } else {
    return new InvalidRequest(400, "Only GET.");
  }
}

class ValidGetRequest {
  ListId: string;

  constructor(listId: string) {
    this.ListId = listId;
  }
}

class InvalidRequest {
  ErrorCode: number;
  ErrorMessage: string;
  constructor(errorCode: number, errorMessage: string) {
    (this.ErrorCode = errorCode), (this.ErrorMessage = errorMessage);
  }
}
