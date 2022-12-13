import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "../graphql/rootSchema.js"

const graphqlRouter = express.Router()

graphqlRouter.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
  }));


  export default graphqlRouter
