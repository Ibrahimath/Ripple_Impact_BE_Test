import {gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
  }
  type Mutation {
    signup(input: SignupInput!): User
    login(input: LoginInput!): AuthPayload
  }
`;
