const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server-express")
const express = require("express")

const main = async () => {
  const app = express()
  const server = new ApolloServer({
    typeDefs: require("./typeDefs"),
    resolvers: require("./resolvers"),
  })
  server.applyMiddleware({ app, path: process.env.NODE_ENV === "production" ? "/" : "/graphql" })

  await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
}

main().catch(e => {
  console.error(e)
  process.exit(-1)
})
