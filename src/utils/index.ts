import errors from "./errors";
import { StartServerProps, } from "../types";
import { isDevelopment, DEFAULT_SERVER_ERROR_MESSAGE } from '../utils/constants';

import { isValidObjectId } from 'mongoose';
import { ApolloServerExpressConfig } from "apollo-server-express";

export const startServer = ({ app, port, host, server }: StartServerProps) => {
  app.listen(Number(port), host, () => console.log(`app listening on ${host}:${port}${server?.graphqlPath}`)
  );
};

export const validateMongoObjectId = (...ids: unknown[]) => ids.forEach(id => {
  if (id && !isValidObjectId(id)) {
    throw new errors.ValidationError('invalid idenitifier');
  }
});

export const formatError: ApolloServerExpressConfig['formatError'] = (error) => ({
  message: error.message || DEFAULT_SERVER_ERROR_MESSAGE,
  path: error.path,
  locations: error.locations,
  stack: isDevelopment ? (error.stack?.split?.('\n') ?? []) : undefined,
  extensions: isDevelopment ? error.extensions : undefined,
});