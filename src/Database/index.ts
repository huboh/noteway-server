import mongoose from "mongoose";

import * as api from './api';
import { ConnectProps } from "../types";

export default class Database {

  private static _instance: Database;
  private connection = mongoose.connection;

  // * models api
  User = api.User;
  Note = api.Note;
  Collaborator = api.Collaborator;

  constructor() {
    return Database._instance ?? (Database._instance = this);
  }

  async close() {
    return this.connection.close();
  }

  async connect(connectionString: string, options: ConnectProps) {
    try {
      this.connection.on('open', () => options.onOpen?.());
      this.connection.on('close', () => options.onClose?.());
      this.connection.on('error', () => options.onError?.());
      this.connection.on('disconnected', () => options.onDisconnect?.());

      await mongoose.connect(connectionString);

    } catch (error) {
      options.onError?.(error);
    }
  }

}