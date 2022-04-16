import errors from '../errors';
import { isInstanceof } from '../';
import jsonWebToken from 'jsonwebtoken';
import { SESSION_EXPIRED_MESSAGE, SESSION_INVALID_MESSAGE } from '../constants';

const { TOKEN_SECRET } = process.env;

const generateToken = (payload: object, options: jsonWebToken.SignOptions = {}) => (
  jsonWebToken.sign(payload, TOKEN_SECRET!, {
    expiresIn: 28800, // 8hrs in seconds
    ...options
  })
);

const verifyToken = (token: string, options: jsonWebToken.VerifyOptions = {}) => (
  jsonWebToken.verify(token, TOKEN_SECRET!, {
    ...options
  })
);

const handleTokenError = (error: unknown) => {
  const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = jsonWebToken;
  const isJwtError = isInstanceof(error, [JsonWebTokenError, NotBeforeError, TokenExpiredError]);

  if (!isJwtError) {
    throw error;
  }

  const isExpiredToken = error.name === 'TokenExpiredError';
  const errorMessage = isExpiredToken ? SESSION_EXPIRED_MESSAGE : SESSION_INVALID_MESSAGE;

  throw new errors.AuthenticationError(
    errorMessage
  );
};

export default {
  verifyToken,
  generateToken,
  handleTokenError
};