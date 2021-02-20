const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
module.exports = {
  Query: {
    users: async () => {
      return await User.find()
    },
    user: async (_parent, { id }, _ctx, _info) => {
      return await User.findById(id)
    },
    me: async (_parent, _args, { user }, _info) => {
      if (!user) {
        throw new Error("Not logged in")
      }
      return user
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
    },
    login: async (_p, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user) {
        throw new Error("No user with that username")
      }

      // @ts-ignore
      const valid = user.password === password
      if (!valid) {
        throw new Error("Incorrect password")
      }

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    }
  }
}