const UserResolver = require("./resolvers/User.resolver")
module.exports = {
  Query: {
    hello(_parent, { name }, _ctx, _info) {
      return `Hello ${name || "world"}!`
    },
    ...UserResolver.Query
  },
  Mutation: {
    ...UserResolver.Mutation
  }
}