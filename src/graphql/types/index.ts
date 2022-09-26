import { Resolvers, Context } from '../../types';

export type Variables = Record<string, any>;
export type QueryResolvers<T = null, U = Variables, V = Context, W = any> = Resolvers<T, U, V, W>;
export type MutationResolvers<T = null, U = Variables, V = Context, W = any> = Resolvers<T, U, V, W>;