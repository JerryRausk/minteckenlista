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
  const variants = await findVariants(req.WordId);

  // Return
  if (!variants) {
    return response.status(404).send(`List with id ${req.WordId} not found.`);
  }

  return response.status(200).send(variants);
}

async function findVariants(wordId: string) {
  const prisma = new PrismaClient();

  const variants = prisma.wordVariant
    .findMany({
      where: {
        wordId: parseInt(wordId),
      },
    })
    .catch(async (e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return variants;
}
async function validateRequest(
  req: VercelRequest
): Promise<ValidGetRequest | InvalidRequest> {
  if (req.method === "GET") {
    const { wordId } = req.query;

    if (Array.isArray(wordId)) {
      return new InvalidRequest(400, "listId should not be a list.");
    }

    return new ValidGetRequest(wordId);
  } else {
    return new InvalidRequest(400, "Only GET.");
  }
}

class ValidGetRequest {
  WordId: string;

  constructor(wordId: string) {
    this.WordId = wordId;
  }
}

class InvalidRequest {
  ErrorCode: number;
  ErrorMessage: string;
  constructor(errorCode: number, errorMessage: string) {
    (this.ErrorCode = errorCode), (this.ErrorMessage = errorMessage);
  }
}
