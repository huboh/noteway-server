import { Model, FilterQuery, ClientSession } from 'mongoose';

export interface PaginateQueryProps<T> {
  session?: ClientSession;
  model: Model<T>;
  query: FilterQuery<T> & {
    page?: number;
    limit?: number;
  };
}
