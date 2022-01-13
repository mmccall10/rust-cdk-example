import { APIGatewayProxyEventV2 } from "aws-lambda";
export const handler = async (event: APIGatewayProxyEventV2) => {
  const name = event.pathParameters?.name || "World";
  return `⚡️ Hello, ${name}! ⚡️`;
};
