import { StartServerProps } from "../types";

export * from './uuid';

export const startServer = ({ app, port, host, server }: StartServerProps) => {
  app.listen(Number(port), host, () => console.log(`app listening on ${host}:${port}${server?.graphqlPath}`)
  );
};