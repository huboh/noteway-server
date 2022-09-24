import typeDefs from '../../graphql/schema';
import resolvers from '../../graphql/resolvers';

import { context } from "../../index";
import { formatError } from '../../utils';
import { ApolloServerExpressConfig } from "apollo-server-express";

export const apolloServerConfig: ApolloServerExpressConfig = {
  formatError,
  resolvers,
  typeDefs,
  context,
};

export {
  apolloServerConfig as default
};