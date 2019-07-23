const gql = require("graphql");
const axios = require("axios");
const { SERVER_MOVIES, SERVER_TV, SERVER_USER } = process.env;

const schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType(
    {
      name: "MovieAPIQuery",
      fields: {
        movieByID: {
          type: MovieSchema,
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
          type: MovieSchema,
          args: {
            userId: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
            token: { type: gql.GraphQLString }
          },
          async resolve(_previous, args, _context) {
            let { userId, token } = args;
            let { data } = await axios({
              method: "GET",
              url: SERVER_MOVIES + "/" + userId,
              headers: {
                token
              },
              data: {}
            });
            return data;
          }
        },
        movieList: {
          type: new gql.GraphQLList(MovieSchema),
          async resolve() {
            return await Student.find({});
          }
        }
      }
    },
    {
      name: "SeriesAPIQuery",
      fields: {
        series: {
          type: StudentSchema,
          args: {
            id: { type: new gql.GraphQLNonNull(gql.GraphQLID) }
          },
          async resolve(_previous, args, _context) {
            return await Student.findById(args.id);
          }
        },
        seriesList: {
          type: new gql.GraphQLList(StudentSchema),
          async resolve() {
            return await Student.find({});
          }
        }
      }
    }
  ),
  mutation: new gql.GraphQLObjectType(
    {
      name: "MovieAPIMutation",
      fields: {
        createMovie: {
          type: MovieSchema,
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
            let {
              title,
              overview,
              poster_path,
              popularity,
              tag,
              status
            } = args;
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
        deleteMovie: {
          type: MovieSchema,
          args: {
            id: { type: gql.GraphQLString },
            token: { type: gql.GraphQLInt }
          },
          async resolve(_parent, args) {
            let { id, token } = args;

            let { data } = await axios({
              method: "DELETE",
              url: serverURL + "/" + id,
              headers: {
                token
              },
              data: {}
            });
            return data;
          }
        }
      }
    },
    {
      name: "SeriesAPIMutation",
      fields: {
        createMovie: {
          type: StudentSchema,
          args: {
            name: { type: gql.GraphQLString },
            age: { type: gql.GraphQLInt }
          },
          async resolve(_parent, args) {
            return await Student.create(args);
          }
        },
        deleteMovie: {
          type: StudentSchema,
          args: {
            id: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
            token: { type: gql.GraphQLString }
          },
          async resolve(_parent, args) {
            return await Student.create(args);
          }
        }
      }
    }
  )
});

module.exports = schema;
