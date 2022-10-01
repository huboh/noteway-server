// * root resolvers
import Query from './Query';
import Mutation from './Mutation';

// * type resolvers
import Note from './Query/Note';
import User from './Query/User';


const resolvers = {
  // root resolvers
  Query,
  Mutation,

  // type resolvers
  User,
  Note
};

export {
  resolvers as default
};