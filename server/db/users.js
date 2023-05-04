import { connection } from './connection.js';

const getUserTable = () => connection.table('user');

export async function getUser(id) {
  return await getUserTable().first().where({ id });
}

export async function getUserByEmail(email) {
  return await getUserTable().first().where({ email });
}

// create a new user
export async function createUser(user) {
  // check if user already exists
  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  // check if email and password are provided
  if (!user.email || !user.password) {
    throw new Error('Email, and password are required');
  }
  return await getUserTable().insert({
    ...user,
    id: Date.now().toString(),
    companyId: 'FjcJCHJALA4i',
  });
}
