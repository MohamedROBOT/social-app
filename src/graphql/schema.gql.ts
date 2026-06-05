import { GraphQLSchema } from "graphql";
import { query } from "./query.gql";
import {mutation} from "./mutation.gql"
 export const schema = new GraphQLSchema({
        query,
        mutation
        // subscription
    })