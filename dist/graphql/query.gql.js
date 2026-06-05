"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const graphql_1 = require("graphql");
const comment_query_gql_1 = require("../modules/comment/graphql/comment.query.gql");
const post_gql_query_1 = require("../modules/post/graphql/post.gql.query");
const user_gql_query_1 = require("../modules/user/graphql/user.gql.query");
exports.query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        //auth
        ...user_gql_query_1.userGQLQuery,
        ...post_gql_query_1.postGQLQuery,
        ...comment_query_gql_1.commentGQLQuery
        //request
    }
    // description
});
