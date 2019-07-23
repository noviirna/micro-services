const gql = require("graphql");

const MovieObject = new gql.GraphQLObjectType({
  name: "MovieObjectjGQL",
  fields: {
    _id: { type: gql.GraphQLID },
    userId: { type: gql.GraphQLID },
    title: { type: gql.GraphQLString },
    overview: { type: gql.GraphQLString },
    poster_path: { type: gql.GraphQLString },
    popularity: { type: gql.GraphQLString },
    tag: { type: new gql.GraphQLList(gql.GraphQLString) },
    status: { type: gql.GraphQLString }
  }
});

module.exports = MovieObject;
