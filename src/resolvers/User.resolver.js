const User = require("../models/User.model")
module.exports = {
  Query: {
    users: async () => {
      return await User.find()
    },
    user: async (_parent, { id }, _ctx, _info) => {
      return await User.findById(id)
    }
  },
  Mutation: {
    createUser: async (_p, { input }, _ctx, _info) => {
      const user = new User({
        username: input.username,
        email: input.email,
        name: input.name,
        password: input.password
      })
      await user.save().catch(e => {
        if (e.name === "ValidationError") {
          throw e
        }
        else {
          console.log("[createUser] ERROR:\n", e)
          throw new Error("Something went wrong.")
        }
      })
      return user
    }
  }
}