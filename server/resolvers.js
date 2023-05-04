import { createJob, getCompanyJobs, getJob, getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { combineResolvers } from 'graphql-resolvers';
import { permissions, protect } from './utils/protectRoute.js';
import { createUser, getUserByEmail } from './db/users.js';
import { createToken } from './utils/jwt.js';
export const resolvers = {
  Query: {
    company: (parent, args) => getCompany(args.id),
    job: combineResolvers(protect, (parent, args, context, info) => {
      return getJob(args.id);
    }),
    jobs: combineResolvers(protect, permissions, (parent, args, context) => {
      return getJobs();
    }),
  },
  // note this always takes the parent as the first argument
  Job: {
    date: (job) => {
      return job.createdAt.slice(0, 'yyyy-mm-dd'.length);
    },
    company: (job) => {
      return getCompany(job.companyId);
    },
  },
  Company: {
    jobs: (company) => {
      return getCompanyJobs(company.id);
    },
  },

  Mutation: {
    login: async (parent, { input: { email, password } }, context) => {
      // console.log('Insdie signup');
      const user = await getUserByEmail(email);
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      // sign the token and return it
      // create token with all the user info except password
      const token = createToken({
        id: user.id,
        email: user.email,
        companyId: user.companyId,
      });
      return {
        token,
      };
    },
    signup: async (parent, { input: { email, password } }, context) => {
      const user = await createUser({ email, password });
      // call login to sign the token and return it
      const token = createToken({
        id: user.id,
        email: user.email,
        companyId: user.companyId,
      });
      return {
        token,
      };
    },
    createJob: (parent, { input: { title, description } }, context) => {
      return createJob({ title, description, companyId: 'FjcJCHJALA4i' }); //nishan change this is take compnayid from context after proper auth
    },
  },
};
