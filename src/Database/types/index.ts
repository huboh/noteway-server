export interface ConnectProps {
  /**
   * handler for `open` event, emitted when mongoose is connected to MongoDB, emitted after the `connected` event is emitted
   */
  onSuccess?(): void;
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

export interface DatabaseConfig extends ConnectProps {
  connectionString: string;
}