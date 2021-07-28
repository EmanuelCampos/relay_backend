import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

import { connectDatabase } from "./config/mongoose";
import { schema } from "./graphql/schema";

dotenv.config();

connectDatabase();

const server = new ApolloServer({
  schema,
});

server.listen(3000, () => {
  console.log("Server is running");
});
