import { GraphQLError } from "graphql";

export function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}

export function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
