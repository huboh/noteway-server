import jsonWebToken, { SignOptions, VerifyOptions } from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

const generateToken = async (payload: object | any[], options: SignOptions = {}) => {
  return jsonWebToken.sign(payload, TOKEN_SECRET!, {
    expiresIn: 28800, // 8hrs in seconds
    ...options
  });
};

const verifyToken = async (token: string, options: VerifyOptions = {}) => {
  return jsonWebToken.verify(token, TOKEN_SECRET!, {
    ...options
  });
};

export default {
  verifyToken,
  generateToken,
};