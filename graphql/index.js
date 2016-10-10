import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import mutations from './mutations';
import queries from './queries';

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      'qroot': {
        type: new GraphQLObjectType({
          name: 'QRoot',
          fields: {...queries}
        }),
        resolve: () => true
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      'mroot': {
        type: new GraphQLObjectType({
          name: 'MRoot',
          fields: {...mutations}
        })
      }
    }
  })
});

export default Schema;
