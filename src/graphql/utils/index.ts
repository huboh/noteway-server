import { gql } from 'apollo-server-express';
import { readFileSync } from "fs";

export const readGraphQlFile = (filePath: string) => {
  return readFileSync(filePath, {
    encoding: "utf-8",
    flag: "r"
  });
};

export const parseGraphQlFile = (...filePaths: string[]) => {
  return gql`${filePaths.map(readGraphQlFile)}`;
};