import express from "express";
import { ApolloServer} from "apollo-server-express";
import mongoose from "mongoose";

import { resolvers } from "./resolvers/resolvers.js";
import { typeDefs } from "./typeDefs/index.js";

// Initialize Express
const app = express();

// Creating the Apollo Server and applying it to Express
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
server.applyMiddleware({ app });

// Start the Express server
const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/myap")
  .then(
    app.listen(PORT, () => {
      console.log(
        `GraphQL server is running on http://localhost:${PORT}/graphql`
      );
    })
  )
  .catch((e) => {
    console.log("not connected to MongoDB");
  });
