import { Express } from "express";
import { ApolloServer } from "apollo-server-express";

export interface StartServerProps {
  app: Express;
  host: string;
  port: string | number;
  server?: ApolloServer;
}

export type StartServer = (props: StartServerProps) => void; 