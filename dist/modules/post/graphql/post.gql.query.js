"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGQLQuery = void 0;
const post_type_gql_1 = require("./post.type.gql");
const services_1 = require("../../../common/DI/services");
const graphql_1 = require("graphql");
exports.postGQLQuery = {
    post: {
        type: post_type_gql_1.PostGQLType,
        args: { id: { type: graphql_1.GraphQLID } },
        resolve: async (parent, args) => {
            return await services_1.postService.get(args.id);
        },
    },
};
