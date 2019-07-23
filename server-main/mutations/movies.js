const gql = require("graphql");
const axios = require("axios");
const MovieObject = require("../object/movies");
const { SERVER_MOVIES, SERVER_TV, SERVER_USER } = process.env;

module.exports = {
  createMovie: {
    type: MovieObject,
    args: {
      title: { type: gql.GraphQLString },
      overview: { type: gql.GraphQLString },
      poster_path: { type: gql.GraphQLString },
      popularity: { type: gql.GraphQLString },
      tag: { type: gql.GraphQLString },
      status: { type: gql.GraphQLString },
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { title, overview, poster_path, popularity, tag, status } = args;

      if ((!title, !overview, !poster_path, !popularity, !tag, !status)) {
        return { message: "please complete the form" };
      }

      let { data } = await axios({
        method: "POST",
        url: SERVER_MOVIES,
        headers: {
          token: args.token
        },
        data: { title, overview, poster_path, popularity, tag, status }
      });
      return data;
    }
  },
  updateMovie: {
    type: MovieObject,
    args: {
      id: { type: gql.GraphQLID },
      title: { type: gql.GraphQLString },
      overview: { type: gql.GraphQLString },
      poster_path: { type: gql.GraphQLString },
      popularity: { type: gql.GraphQLString },
      tag: { type: gql.GraphQLString },
      status: { type: gql.GraphQLString },
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let {
        title,
        overview,
        poster_path,
        popularity,
        tag,
        status,
        id,
        token
      } = args;
      let updValue = {};
      if (title) {
        updValue.title = title;
      }
      if (overview) {
        updValue.overview = overview;
      }
      if (poster_path) {
        updValue.poster_path = poster_path;
      }
      if (popularity) {
        updValue.popularity = popularity;
      }
      if (tag) {
        updValue.tag = tag;
      }
      if (status) {
        updValue.status = status;
      }

      let { data } = await axios({
        method: "PATCH",
        url: SERVER_MOVIES + "/" + id,
        headers: {
          token
        },
        data: updValue
      });
      return data;
    }
  },
  deleteMovie: {
    type: MovieObject,
    args: {
      id: { type: gql.GraphQLString },
      token: { type: gql.GraphQLString }
    },
    async resolve(_parent, args) {
      let { id, token } = args;

      let { data } = await axios({
        method: "DELETE",
        url: SERVER_MOVIES + "/" + id,
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  }
};
