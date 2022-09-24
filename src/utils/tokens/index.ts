import errors from '../errors';
import { isInstanceof } from '../';
import { SESSION_EXPIRED_MESSAGE, SESSION_INVALID_MESSAGE } from '../../constants';
import { sign, verify, SignOptions, VerifyOptions, JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

export const { TOKEN_SECRET } = process.env;

export const generateToken = (payload: object, options: SignOptions = {}) => {
  return sign(payload, TOKEN_SECRET!, {
    expiresIn: 28800, // 8hrs in seconds
    ...options
  });
};

export const verifyToken = (token: string, options: VerifyOptions = {}) => {
  return verify(token, TOKEN_SECRET!, {
    ...options
  });
};

export const handleTokenError = (error: unknown) => {
  if (!isInstanceof(error, [JsonWebTokenError, NotBeforeError, TokenExpiredError])) {
    throw error;
  }

  throw new errors.AuthenticationError(
    error.name === 'TokenExpiredError' ? SESSION_EXPIRED_MESSAGE : SESSION_INVALID_MESSAGE
  );
};

export default {
  verifyToken,
  generateToken,
  handleTokenError,
  TOKEN_SECRET
};