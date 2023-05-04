import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { authMiddleware, handleLogin } from './auth.js';
import { readFile } from 'fs/promises';
import { resolvers } from './resolvers.js';
const PORT = 9000;

const app = express();
app.use(cors(), express.json());

const typeDefs = await readFile('./schema.graphql', 'utf-8');
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// getContext function
const getContext = async ({ req }) => {
  return {
    request: req,
    dataSources: {},
  };
};
await server.start();
app.use(
  '/graphql',
  apolloMiddleware(server, {
    context: getContext,
  })
);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
