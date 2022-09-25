import type { DatabaseConfig } from "../../Database/types";

export const getDataBaseConfig = (): DatabaseConfig => {
  return {
    connectionString: process.env.MONGO_CONNECTION_STRING || "",

    onDisconnect: () => {
      console.log('database connection lost');
      process.exit(0);
    },
    onError: (error) => {
      console.log(`database${error ? ' initial ' : ' '}connection error`);
      process.exit(1);
    },
  };
};

export {
  getDataBaseConfig as default
};