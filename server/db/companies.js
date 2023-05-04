import { connection } from './connection.js';
import { getCompanyJobs } from './jobs.js';

const getCompanyTable = () => connection.table('company');

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}
