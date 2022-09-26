// import Redis from "ioredis";
import express from 'express';
import Database from './Database';

import { startServer, getRequestUserId } from './utils';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { getDataBaseConfig, getApolloServerConfig } from "./configs";

const port = process.env.PORT || 5000;;
const host = process.env.HOST || "localhost";

const app = express();
const database = new Database(getDataBaseConfig());
const graphQlServer = new ApolloServer(getApolloServerConfig(context));

database.connect({
  onSuccess: () => {
    graphQlServer.start().then(() => startServer({ app, host, port, server: graphQlServer }));
  }
});

async function context(gQlContext: ExpressContext) {
  // TODO: read from cache instead
  const id = getRequestUserId(gQlContext.req);
  const user = await database.models.User.findOne({ userId: id });

  return {
    userId: id,
    database,
    user,
  };
}

export {
  context
};