const gql = require("graphql");

const MovieObject = require("../types/movies");
const SeriesObject = require("../types/series");

const UserObject = new gql.GraphQLObjectType({
  name: "UserObject",
  fields: {
    _id: { type: gql.GraphQLID },
    email: { type: gql.GraphQLString },
    token: { type: gql.GraphQLString },
    user: { type: gql.GraphQLString },
    favoriteMovies: { type: new gql.GraphQLList(MovieObject) },
    favoriteSeries: { type: new gql.GraphQLList(SeriesObject) }
  }
});

module.exports = UserObject;
