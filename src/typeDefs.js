const { gql } = require("apollo-server-express")
module.exports = gql`
type Query {
  hello(name: String): String!
  users: [User]!
  user(id: ID!): User,
  me: User
}

type Mutation {
  createUser(input: CreateUserInput): User
  login(username: String!, password: String!): String!
  deleteUser: Boolean!
}

input CreateUserInput {
  username: String!
  email: String!
  name: String!
  password: String!
}

type User {
  id: ID!
  username: String!
  email: String!
  name: String!
}
`