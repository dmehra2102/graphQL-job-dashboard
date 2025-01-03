import cors from "cors";
import express from "express";
import { resolvers } from "./resolvers.js";
import { readFile } from "node:fs/promises";
import { ApolloServer } from "@apollo/server";
import { authMiddleware, handleLogin } from "./auth.js";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

const typeDefs = await readFile("./schema.graphql", { encoding: "utf8" });

app.post("/login", handleLogin);

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

app.use("/graphql", apolloMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server url : http://localhost:${PORT}/graphql`);
});
