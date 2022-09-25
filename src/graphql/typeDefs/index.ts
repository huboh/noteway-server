import { parseGraphQlFile } from "../utils";
import { GraphQl_Schema_Path, GraphQl_Schema_Enums_Path, GraphQl_Schema_Inputs_Path } from "../../constants";

export const typeDefs = parseGraphQlFile(GraphQl_Schema_Enums_Path, GraphQl_Schema_Inputs_Path, GraphQl_Schema_Path);

export {
  typeDefs as default
};