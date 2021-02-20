const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const expressJwt = require("express-jwt")
const UserModel = require("./models/User.model")

const main = async () => {
  const app = express()

  const authMiddleware = expressJwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  })

  const path = process.env.NODE_ENV === "production" ? "/" : "/graphql"
  app.use(path, authMiddleware)

  const server = new ApolloServer({
    typeDefs: require("./typeDefs"),
    resolvers: require("./resolvers"),
    context: async ({ req }) => {
      const user = await UserModel.findById(req.user && req.user.id)
      return {
        user
      }
    }
  })
  server.applyMiddleware({ app, path })

  await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
}

main().catch(e => {
  console.error(e)
  process.exit(-1)
})
