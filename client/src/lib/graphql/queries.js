import { gql, GraphQLClient } from "graphql-request";

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        date
        company {
          id
          name
        }
      }
    }
  `;

  const data = await client.request(query);
  return data.jobs;
}

const client = new GraphQLClient("http://localhost:9000/graphql");
