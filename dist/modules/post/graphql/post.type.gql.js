"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostGQLType = void 0;
const type_1 = require("graphql/type");
const user_gql_type_1 = require("../../user/graphql/user.gql.type");
exports.PostGQLType = new type_1.GraphQLObjectType({
    name: "PostType",
    fields: {
        _id: { type: type_1.GraphQLID },
        content: { type: type_1.GraphQLString },
        attachments: { type: new type_1.GraphQLList(type_1.GraphQLString) },
        reactionCount: { type: type_1.GraphQLInt },
        commentsCount: { type: type_1.GraphQLInt },
        sharesCount: { type: type_1.GraphQLInt },
        user: { type: user_gql_type_1.userGQLType, resolve: (parent) => {
                return parent.userId;
            } }
    }
});
