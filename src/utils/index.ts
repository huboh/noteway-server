import errors from "./errors";
import { StartServerProps, PaginateQueryProps } from "../types";
import { isDevelopment, DEFAULT_SERVER_ERROR_MESSAGE, PAGINATION_LIMIT, PAGINATION_INITIAL_PAGE } from '../utils/constants';

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

export const paginateQuery = async <T>(props: PaginateQueryProps<T>) => {
  let { limit, page, model, query } = props;

  limit = isNaN(Number(limit)) ? PAGINATION_LIMIT : limit;
  page = isNaN(Number(page)) ? PAGINATION_INITIAL_PAGE : page;

  const currentPage = (page <= 1) ? 1 : page;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const skip = previousPage * limit;
  const nodes = await model.find({ ...query }).skip(skip).limit(limit);
  const total = nodes.length;

  return {
    nodes,
    pageInfo: {
      limit,
      total,
      nextPage,
      currentPage,
      previousPage,
    }
  };
};