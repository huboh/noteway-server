import jsonWebToken, { SignOptions, VerifyOptions } from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

const generateToken = (payload: object | any[], options: SignOptions = {}) => (
  jsonWebToken.sign(payload, TOKEN_SECRET!, {
    expiresIn: 28800, // 8hrs in seconds
    ...options
  })
);

const verifyToken = (token: string, options: VerifyOptions = {}) => (
  jsonWebToken.verify(token, TOKEN_SECRET!, {
    ...options
  })
);

export default {
  verifyToken,
  generateToken,
};;