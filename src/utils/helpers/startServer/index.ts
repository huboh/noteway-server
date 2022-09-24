import { StartServer } from "./types";
import { GraphQl_Path } from "../../../constants";

export const startServer: StartServer = (props) => {
  const { server, app, host, port } = props;

  server?.applyMiddleware({ app, path: GraphQl_Path });
  app.listen(Number(port), host, () => {
    console.log(`server started, listening on ${host}:${port}${server?.graphqlPath}`);
  });
};

export {
  startServer as default
};