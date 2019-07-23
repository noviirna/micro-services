const gql = require("graphql");

const UserObject = new gql.GraphQLObjectType({
  name: "UserObject",
  fields: {
    _id: { type: gql.GraphQLID }
  }
});

module.exports = UserObject;
