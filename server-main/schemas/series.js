const gql = require("graphql");
const axios = require("axios");
const { SERVER_MOVIES, SERVER_TV, SERVER_USER } = process.env;

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

module.exports = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: "MovieAPIQuery",
    fields: {
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
        type: MovieObject,
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
    }
  }),
  mutation: new gql.GraphQLObjectType({
    name: "MovieAPIMutation",
    fields: {
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
    }
  })
});
