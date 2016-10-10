import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
  }
});
