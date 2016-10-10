import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

import userType from '../types/user';
import userInputType from '../types/user-input';
import { UserService } from '../../services';

let queries = {};
let mutations = {};

queries.user = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, args, context) {
    return UserService.getUser(args.id, context);
  }
};

queries.users = {
  type: new GraphQLList(userType),
  args: {},
  async resolve (root, args, context) {
    return UserService.getUsers(context);
  }
};

queries.currentUser = {
  type: userType,
  args: {},
  async resolve (root, args, context) {
    return UserService.getCurrentUser(context);
  }
}

mutations.addUser = {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  async resolve (root, params, options) {
    return UserService.signup(params.data);
  }
};

mutations.removeUser = {
  type: userType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, args, context) {
    return UserService.removeUser(args._id, context);
  }
};

export default {
  queries,
  mutations
}
