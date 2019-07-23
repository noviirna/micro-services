const gql = require("graphql");
const axios = require("axios");
const UserObject = require("../types/user");
const { SERVER_USER } = process.env;

module.exports = {
  register: {
    type: UserObject,
    args: {
      email: { type: gql.GraphQLString },
      password: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { email, password } = args;

      if (!email || !password) {
        return { message: "please complete the form" };
      }

      let { data } = await axios({
        method: "POST",
        url: SERVER_USER + "/register",
        headers: {},
        data: { email, password }
      });
      return data;
    }
  },
  login: {
    type: UserObject,
    args: {
      email: { type: gql.GraphQLString },
      password: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { email, password } = args;

      if (!email || !password) {
        return { message: "please complete the form" };
      }

      let { data } = await axios({
        method: "POST",
        url: SERVER_USER + "/login",
        headers: {},
        data: { email, password }
      });
      return data;
    }
  },
  addFavoriteMovie: {
    type: UserObject,
    args: {
      id: { type: gql.GraphQLString },
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { id, token } = args;
      let { data } = await axios({
        method: "POST",
        url: SERVER_USER + "/favorites/movies/" + id,
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  removeFavoriteMovie: {
    type: UserObject,
    args: {
      id: { type: gql.GraphQLString },
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { id, token } = args;

      let { data } = await axios({
        method: "DELETE",
        url: SERVER_USER + "/favorites/movies/" + id,
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  addFavoriteSeries: {
    type: UserObject,
    args: {
      id: { type: gql.GraphQLString },
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { id, token } = args;

      let { data } = await axios({
        method: "POST",
        url: SERVER_USER + "/favorites/series/" + id,
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  removeFavoriteSeries: {
    type: UserObject,
    args: {
      id: { type: gql.GraphQLString },
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { id, token } = args;

      let { data } = await axios({
        method: "DELETE",
        url: SERVER_USER + "/favorites/series/" + id,
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  }
};
