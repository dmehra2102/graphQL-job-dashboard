import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    company: (_root, args) => getCompany(args.id),
    job: (_root, args) => getJob(args.id),
    jobs: () => getJobs(),
  },

  Company: {
    jobs: (compnay) => getJobsByCompany(compnay.id),
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
