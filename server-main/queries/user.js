const gql = require("graphql");
const axios = require("axios");
const UserObject = require("../types/user");
const { SERVER_USER } = process.env;

module.exports = {
  getFavoriteSeries: {
    type: UserObject,
    args: {
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { token } = args;
      let { data } = await axios({
        method: "GET",
        url: SERVER_USER + "/favorites/series",
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  getFavoriteMovie: {
    type: UserObject,
    args: {
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { token } = args;
      let { data } = await axios({
        method: "GET",
        url: SERVER_USER + "/favorites/movies",
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  getFavorite: {
    type: UserObject,
    args: {
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { token } = args;
      let { data } = await axios({
        method: "GET",
        url: SERVER_USER + "/favorites",
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  }
};
