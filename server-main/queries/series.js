const gql = require("graphql");
const axios = require("axios");
const SeriesObject = require("../object/series");
const { SERVER_TV } = process.env;

module.exports = {
  seriesByID: {
    type: SeriesObject,
    args: {
      id: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
      token: { type: gql.GraphQLString }
    },
    async resolve(_previous, args, _context) {
      let { id, token } = args;
      let { data } = await axios({
        method: "GET",
        url: SERVER_TV + "/" + id,
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  seriesByUser: {
    type: new gql.GraphQLList(SeriesObject),
    args: {
      userId: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
      token: { type: gql.GraphQLString }
    },
    async resolve(_previous, args, _context) {
      let { userId, token } = args;
      let { data } = await axios({
        method: "GET",
        url: SERVER_TV + "/user",
        headers: {
          token
        },
        data: {}
      });
      return data;
    }
  },
  seriesList: {
    type: new gql.GraphQLList(SeriesObject),
    async resolve() {
      let { data } = await axios({
        method: "GET",
        url: SERVER_TV,
        headers: {},
        data: {}
      });
      return data;
    }
  }
};
