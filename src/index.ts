import Database from './Database';
import { startServer } from './utils';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';


const { PORT, MONGO_CONNECTION_STRING } = process.env;
const host = 'localhost';
const port = PORT || 5000;

const app = express();
const database = new Database('hey');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req: request, res: response }) => ({
    request,
    response,
    userId: request.headers.authorization
  })
});


database.connect(MONGO_CONNECTION_STRING!, {
  onDisconnect: () => {
    console.log('database connection lost');
    process.exit(0);
  },

  onError: (error) => {
    console.log(`database${error ? ' initial ' : ' '}connection error`);
    process.exit(1);
  },

  onOpen: async () => {
    console.log('connection to database established 🥳');

    await server.start();
    server.applyMiddleware({ app, path: '/api/graphql' });

    startServer({ app, host, port, server });
  }
});