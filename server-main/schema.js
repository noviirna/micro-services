const gql = require("graphql");

const MovieMutation = require("./mutations/movies");
const MovieQuery = require("./queries/movies");

const SeriesMutation = require("./mutations/series");
const SeriesQuery = require("./queries/series");

const UserQuery = require("./queries/user");
const UserMutation = require("./mutations/user");

module.exports = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: "OrchestratorQuery",
    fields: { ...MovieQuery, ...SeriesQuery, ...UserQuery }
  }),
  mutation: new gql.GraphQLObjectType({
    name: "OrchestratorMutation",
    fields: { ...MovieMutation, ...SeriesMutation, ...UserMutation }
  })
});
