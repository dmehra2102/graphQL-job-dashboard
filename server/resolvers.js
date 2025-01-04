import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
import { notFoundError, toIsoDate } from "./utils.js";

export const resolvers = {
  Query: {
    company: async (_root, args) => {
      const company = await getCompany(args.id);
      if (!company) throw notFoundError(`Company Not found with id ${args.id}`);
      return company;
    },
    job: async (_root, args) => {
      const job = await getJob(args.id);
      if (!job) throw notFoundError(`Job Not found with id ${args.id}`);
      return job;
    },
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
