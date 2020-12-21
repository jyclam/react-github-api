import { GraphQLClient } from "graphql-request";

const ENDPOINT = "https://api.github.com/graphql";

export const graphQLClient = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  },
});
