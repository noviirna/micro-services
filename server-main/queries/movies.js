const gql = require("graphql");
const axios = require("axios");
const MovieObject = require("../object/movies");
const { SERVER_MOVIES, SERVER_TV, SERVER_USER } = process.env;

module.exports = {
  movieByID: {
    type: MovieObject,
    args: {
      id: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
      token: { type: gql.GraphQLString }
    },
    async resolve(_previous, args, _context) {
      let { id, token } = args;
      let { data } = await axios({
        method: "GET",
        url: SERVER_MOVIES + "/" + id,
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  movieByUser: {
    type: new gql.GraphQLList(MovieObject),
    args: {
      userId: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
      token: { type: gql.GraphQLString }
    },
    async resolve(_previous, args, _context) {
      let { userId, token } = args;
      let { data } = await axios({
        method: "GET",
        url: SERVER_MOVIES + "/user",
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  movieList: {
    type: new gql.GraphQLList(MovieObject),
    async resolve() {
      let { data } = await axios({
        method: "GET",
        url: SERVER_MOVIES,
        headers: {},
        data: {}
      });
      return data;
    }
  }
};
