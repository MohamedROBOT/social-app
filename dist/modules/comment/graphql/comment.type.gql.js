"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentGQLType = void 0;
const type_1 = require("graphql/type");
const user_gql_type_1 = require("../../user/graphql/user.gql.type");
const post_gql_type_1 = require("../../post/graphql/post.gql.type");
exports.commentGQLType = new type_1.GraphQLObjectType({
    name: "CommentType",
    fields: {
        user: {
            type: user_gql_type_1.userGQLType,
            resolve: (parent) => {
                //populate in comment service
                return parent.userId;
            }
        },
        post: {
            type: post_gql_type_1.postGQLType,
            resolve: (parent) => {
                return parent.postId;
            }
        },
        content: { type: type_1.GraphQLString },
        attachment: {
            type: type_1.GraphQLString
        },
        mentions: {
            type: new type_1.GraphQLList(user_gql_type_1.userGQLType)
        }
    }
});
