import * as api from './api';
import * as models from './models';

import { connect, connection } from "mongoose";
import { DatabaseConfig, ConnectProps, TransactionCallback } from "./types";
import mongoose, { ClientSession, } from 'mongoose';

export default class Database {
  // * models api
  Tag = api.Tag;
  User = api.User;
  Note = api.Note;
  NoteActivity = api.NoteActivity;
  Collaborator = api.Collaborator;

  public models = models;
  private connection = connection;
  private static _instance: Database;

  constructor(private configs?: Partial<DatabaseConfig>) {
    return Database._instance ?? (Database._instance = this);
  }

  async close() {
    return this.connection.close();
  }

  async connect(options?: ConnectProps) {
    const connectOptions = Object.assign(options ?? {}, (this.configs ?? {}));

    try {
      this.connection.on('open', () => connectOptions.onSuccess?.());
      this.connection.on('close', () => connectOptions.onClose?.());
      this.connection.on('error', () => connectOptions.onError?.());
      this.connection.on('disconnected', () => connectOptions.onDisconnect?.());

      await connect(connectOptions.connectionString!);

    } catch (error) {
      connectOptions.onError?.(error);
    }
  }

  async transaction<T>(callback: TransactionCallback<T>) {
    const session = await mongoose.startSession();
    const transactionResult = await session.withTransaction(callback, {});

    await session.endSession();

    return transactionResult;
  }
}