import { resolve } from "path";

export const GraphQl_Path = '/api/graphql';

export const GraphQl_Schema_Path = resolve(process.cwd(), "graphql/schema.graphql");
export const GraphQl_Schema_Enums_Path = resolve(process.cwd(), "graphql/enums.graphql");
export const GraphQl_Schema_Inputs_Path = resolve(process.cwd(), "graphql/inputs.graphql");