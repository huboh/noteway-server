import { Express } from "express";
import { ApolloServer } from "apollo-server-express";

export const enum NoteVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export const enum ThemePreference {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system'
}

export interface StartServerProps {
  app: Express;
  host: string;
  port: string | number;
  server?: ApolloServer;
}

export interface ConnectProps {
  /**
   * handler for `open` event, emitted when mongoose is connected to MongoDB, emitted after the `connected` event is emitted
   */
  onOpen?(): void;
  /**
   * handler for `close` event, emitted when `mongoose.connection.close()` is called
   */
  onClose?(): void;
  /**
   * handler for errors on initial connection & after initial connection has been established
   */
  onError?(error?: unknown): void;
  /**
   * handler for `disconnected` event, emitted when mongoose disconnects from MongoDB
   */
  onDisconnect?(): void;
}