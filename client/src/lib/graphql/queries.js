import { gql, GraphQLClient } from "graphql-request";

export async function getJob(id) {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        title
        date
        company {
          id
          name
        }
        description
      }
    }
  `;

  const { job } = await client.request(query, { id });
  return job;
}

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

export async function getCompany(id) {
  const query = gql`
    query CompanyById($companyId: ID!) {
      company(id: $companyId) {
        description
        id
        name
        jobs {
          id
          title
          date
        }
      }
    }
  `;

  const { company } = await client.request(query, { companyId: id });
  return company;
}

const client = new GraphQLClient("http://localhost:9000/graphql");
