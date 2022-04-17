import uuid from './uuid';
import mongo from './mongo';
import errors from "./errors";

import * as Types from "../types";
import * as Constants from '../utils/constants';

import { Request } from 'express';
import { MongooseError } from 'mongoose';
import { ApolloServerExpressConfig } from "apollo-server-express";



export const extractNameFromEmail = (email?: string) => (
  String(email).replace(/@.*/, '')
);

export const isInstanceof = <T extends Function>(value: unknown, classes: T[]): value is T => (
  classes.some((c) => value instanceof c)
);

export const startServer = ({ app, port, host, server }: Types.StartServerProps) => {
  app.listen(
    Number(port), host, () => console.log(`app listening on ${host}:${port}${server?.graphqlPath}`)
  );
};

export const validateIdentifiers: Types.ValidateIdentifiers = (ids) => {
  type Key = keyof Parameters<typeof validateIdentifiers>[0];

  Object.keys(ids).forEach(key => {
    switch (key as Key) {
      case 'uuid': ids.uuid && uuid.validateUuid(...ids.uuid); break;
      case 'mongoId': ids.mongoId && mongo.validateId(...ids.mongoId); break;
      default: break;
    }
  });
};

export const formatError: ApolloServerExpressConfig['formatError'] = (error) => ({
  name: error.originalError?.name || error.name,
  message: error.message || Constants.DEFAULT_SERVER_ERROR_MESSAGE,
  path: error.path,
  locations: error.locations,
  stack: Constants.isDevelopment ? (error.stack?.split?.('\n') ?? []) : undefined,
  extensions: Constants.isDevelopment ? error.extensions : undefined,
});

const getQueryLimit = (limit?: number) => (
  isNaN(Number(limit || undefined)) ? Constants.PAGINATION_LIMIT : limit as number
);

const getQueryPage = (page?: number) => (
  isNaN(Number(page || undefined)) ? Constants.PAGINATION_INITIAL_PAGE : page as number
);

export const paginateQuery = async <T>(props: Types.PaginateQueryProps<T>) => {
  const limit = getQueryLimit(props.limit);
  const page = getQueryPage(props.page);
  const currentPage = (page <= 1) ? 1 : page;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const skip = previousPage * limit;

  const [nodes, totalNodes] = await Promise.all([
    props.model.find({ ...props.query }).skip(skip).limit(limit),
    props.model.countDocuments({ ...props.query })
  ]);

  const total = nodes.length;

  return {
    nodes,
    totalNodes,
    pageInfo: {
      hasPreviousPage: currentPage > 1,
      hasNextPage: (limit * currentPage) < totalNodes,
      currentPage,
      previousPage,
      nextPage,
      total,
      limit,
    }
  };
};

export const getHeaderAuthToken = (header: Request['headers'], type: Types.AuthType) => {
  const authHeader = header.authorization || '';
  const [authType, authToken] = authHeader.trim().split(' ');

  return type === authType ? authToken : null;
};

export const handleMongooseError = (error: MongooseError) => {
  switch (error.name) {
    case 'CastError': {
      throw new errors.InvalidPayloadError(error.message);
    }

    case 'ValidationError': {
      Object.values((<any> error).errors).forEach(err => {
        throw new errors.ValidationError((err as any).properties.message);
      }); break;
    }

    default: {
      throw new errors.ServerError(Constants.DEFAULT_SERVER_ERROR_MESSAGE);
    }
  }
};

export const handleError = (error: unknown) => {
  if (error instanceof MongooseError) {
    handleMongooseError(error);
  }
};