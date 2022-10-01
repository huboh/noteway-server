import { PaginateQueryProps } from "./types";
import { PAGINATION_INITIAL_PAGE, PAGINATION_LIMIT } from "../../../constants";

export const getQueryLimit = (limit?: number) => {
  return isNaN(Number(limit || undefined)) ? PAGINATION_LIMIT : limit as number;
};

export const getQueryPage = (page?: number) => {
  return isNaN(Number(page || undefined)) ? PAGINATION_INITIAL_PAGE : page as number;
};

export const paginateQuery = async <T>(props: PaginateQueryProps<T>) => {
  const { model, query, session } = props;
  const { limit: limit_, page: page_ } = query;

  const page = getQueryPage(page_);
  const limit = getQueryLimit(limit_);

  const currentPage = (page <= 1) ? 1 : page;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const skip = previousPage * limit;

  const [nodes, totalNodes] = await Promise.all([
    model.find({ ...props.query }).skip(skip).limit(limit).session(session || null),
    model.countDocuments({ ...props.query }).session(session || null)
  ]);

  return {
    nodes,
    totalNodes,
    pageInfo: {
      total: nodes.length,
      hasPreviousPage: currentPage > 1,
      hasNextPage: (limit * currentPage) < totalNodes,
      previousPage,
      currentPage,
      nextPage,
      limit,
    }
  };
};