import { getCompany } from "./db/companies.js";
import { getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },

  // This resolver function will get the most priority
  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
