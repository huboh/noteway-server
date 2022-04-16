import { Request } from 'express';

import tokens from '../tokens';
import { AuthType } from '../../types';
import { getHeaderAuthToken } from "..";

/**
 * returns the parsed token from the auth header if valid or null otherwise
 */
const parse = (header: Request['headers'], authType: AuthType) => {
  try {
    const authToken = getHeaderAuthToken(header, authType);
    const token = tokens.verifyToken(String(authToken));

    return token;

  } catch (error) {
    return null;
  }
};

export default {
  parse
};