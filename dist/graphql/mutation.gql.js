"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
const graphql_1 = require("graphql");
const post_mutation_gql_1 = require("../modules/post/graphql/post.mutation.gql");
exports.mutation = new graphql_1.GraphQLObjectType({
    name: "RootMutation",
    fields: {
        //auth
        //user
        ...post_mutation_gql_1.postGQLMutation
        //comment
        //request
    }
    // description
});
