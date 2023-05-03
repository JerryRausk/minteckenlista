export const config = {
  runtime: "edge",
  regions: ["arn1"], // only execute this function on arn1 (Stockholm)
};

export default (request: Request) => {
  return new Response(
    `Hello, from ${request.url} I'm now an Edge Function! Sweet`
  );
};
