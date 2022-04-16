import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'express';


const corsMiddleware = cors({ /* cors options */ });
const helmetMiddleware = helmet({ /* helmet options */ });
const jsonParserMiddleware = json({ /* json par options */ });
const urlBodyParserMiddleware = urlencoded({ extended: true });


export default [
  corsMiddleware,
  helmetMiddleware,
  jsonParserMiddleware,
  urlBodyParserMiddleware,
];