import typeDefs from '../../graphql/typeDefs';
import resolvers from '../../graphql/resolvers';

import { Context } from '../../types';
import { formatError } from '../../utils';
import { ApolloServerExpressConfig, ExpressContext } from "apollo-server-express";

export type ContextGetter = (ctx: ExpressContext) => Promise<Context>;

export const getApolloServerConfig = (context: ContextGetter): ApolloServerExpressConfig => {
  return {
    formatError,
    resolvers,
    typeDefs,
    context,
  };
};

export {
  getApolloServerConfig as default
};